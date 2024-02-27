const express = require('express')
const productModel = require('../models/Product')
const path = require('path')
const multer = require('multer')
const router = express.Router()




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })



router.post('/addProduct', upload.single('image'), async (req, res) => {
    const { name, type, stock, price, description } = req.body
    if(req.file) {
        const { filename } = req.file
    await productModel.create({
        name: name,
        type: type,
        stock: stock,
        price: price,
        description: description,
        image: filename
    }).then(result => res.json(result))
        .catch(err => res.json(err))
    }else {
        await productModel.create({
            name: name,
            type: type,
            stock: stock,
            price: price,
            description: description,
          
        }).then(result => res.json(result))
            .catch(err => res.json(err))
    }
})


router.get('/getProducts', (req, res) => {
    productModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


router.get('/getProduct/:id', (req, res) => {
    const { id } = req.params
    productModel.findById({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.put('/updateProduct/:id', upload.single('image'), (req, res) => {
    const  id  = req.params.id
    const { name, type, stock, price, description } = req.body
    if (req.file) {
        const {filename} = req.file;
        productModel.findOneAndUpdate ({ _id: id }, {
            name: name,
            type: type,
            stock: stock,
            price: price,
            description: description,
            image: filename
        
        }).then((result) => res.json(result))
            .catch((err) => res.json(err));

    } else {
        productModel.findOneAndUpdate ({ _id: id }, {
            name: name,
            type: type,
            stock: stock,
            price: price,
            description: description,

        }).then((result) => res.json(result))
            .catch((err) => res.json(err));
    }
})

router.delete('/removeProduct/:id',(req,res)=> {
    const  id  = req.params.id
    productModel.findOneAndDelete({_id:id})
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
})


module.exports = router