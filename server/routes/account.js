const express=require('express')
const bcrypt = require('bcrypt');
const userModel=require('../models/user')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const router=express.Router()



router.post('/signup',async(req,res)=> {
    const {name,email,password}=req.body
   await bcrypt.hash(password,10)
    .then(hash => {
           userModel.create({name,email,password:hash})
      .then(result =>res.json(result))
      .catch(err =>res.json(err))
    })
    .catch(err =>res.json(err))
})

router.post('/login',async(req,res)=> {
    const  {email,password}=req.body 
 await  userModel.findOne({email:email})
   .then(user => {
     if(user) {
       bcrypt.compare(password,user.password,(err,response)=> {
        if(response) {
           const token=jwt.sign({email:user.email,role:user.role},
            "jwtSecretKey",{expiresIn:'1d'})
            res.cookie('token',token)
            return res.json({status:"success",role:user.role,id:user._id})
        }else {
            res.json("password is wrong")
        }
       })
     }else {
        res.json("user not found")
     }
   }).catch(err =>res.json(err))
})


router.use(cookieParser());

const verifyUser=(req,res,next)=> {
    const token=req.cookies.token
    if(!token) {
        return res.json("token was missing")
    }else {
        jwt.verify(token,"jwtSecretKey",(err,decoded)=> {
            if(err) {
                return res.json("error with token")
            }else {
                if(decoded.role==="visitor" || decoded.role==="admin") {
                  next()
                }else {
                    return res.json("not admin and visitor")
                }
            }
        })
    }
}

router.get('/verifyUser',verifyUser,(req,res)=> {
    res.json("success")
})


router.put('/forgotPassword',(req,res)=> {
    const {email,password}=req.body
    userModel.findOne({email})
    .then(user => {
        if(user) {
            bcrypt.hash(password,10)
            .then(hash => {
                user.password=hash
                user.save()
            }).then(err =>res.json(err))
        }else {
            res.json("user not found")
        }
    }).then(err =>res.json(err))
})

router.get('/',(req,res)=> {
    userModel.find()
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
})


module.exports=router