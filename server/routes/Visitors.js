const express=require('express')
const productModel = require('../models/Product')
const userModel=require('../models/user')
const { v4: uuidv4 } = require('uuid');
const stripe=require('stripe')("sk_test_51OKaveSCKRGDSmMN0crU3E0fo5Wf8vFknf3lS4UMAlQqJpoAEnVQcR22qY1N9QxVf6WXZRtJZ1X5RZUNiPjwlKUw00EUlTGlsP")

const router=express.Router()

router.get('/products',(req,res)=> {
    productModel.find()
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
})

router.put('/addToCart/:id',(req,res)=> {
 const {id}=req.params
const {productId}=req.body

    userModel.findById({_id:id})
    .then(user=> {
        if(!user) {
            res.json("user not found")
            console.log("no user")
        }

        const existingCartItem = user.cart.find(item => item. productId.toString() ===  productId.toString());

       
          if(existingCartItem) {
              res.json("item existing in your cart")
              }else {
                  user.cart.push({productId:productId})
                  user.save()
                  .then(result => res.json(result))
                  .catch(err => res.json(err));
              }

    }).catch(err =>res.json(err))
})


router.get('/getCartItems/:id',(req,res)=> {
    const {id}=req.params
   
      userModel.findById({_id:id})
      .populate({
        path:'cart.productId',
        model:"Products",
      select:"image name type stock description price"
      })
      .then(user=> {
        if(!user) {
            res.json("user not founr")
        }
        
        res.json({cart:user.cart})
        
        
      }).catch(err =>res.json(err))
})


router.delete('/removeFromCart/:id/:productId',(req,res)=> {
  const {id,productId}=req.params

  userModel.findByIdAndUpdate({_id:id},{
    $pull:{cart:{_id:productId}}
  }).then(result => res.json({result:"item removed successfully"}))
  .catch(err =>res.json(err))

})

//get product on the basis of category

router.get('/category/:productType', (req, res) => {
  const { productType } = req.params;

  if(productType==="General") {
    productModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
  }else {
    productModel.find({ type: productType })
    .then(result => res.json(result))
    .catch(err => res.json(err));
  }
  
});

//get user details

router.get('/accountDetails/:id',(req,res)=> {
  const{id}=req.params
  userModel.findById({_id:id})
  .then(result =>res.json(result))
  .catch(err =>res.json(err))
})

//stripe integration

router.post('/payment/:id', (req, res) => {
  const { id } = req.params;
  const { token, totalAmount  } = req.body;
  const transactionKey = uuidv4();

  return stripe.customers.create({
    email: token.email,
    source: token.id,
  }).then((customer) => {
    stripe.charges.create({
      amount: totalAmount,
      currency: "INR",
      customer: token.customer.id,
      receipt_email: token.email,
      description: token.description,
      // shippingAddress: token.shippingAddress
    }).then((result) => {
          res.json(result)
    })
      .catch(err => res.json(err));
  }).catch(err => res.json(err));
});


router.post('/addToOrders/:id',(req,res)=> {

  const { id } = req.params;
  const {  productId , stock , totalAmount } = req.body;

  userModel.findById({ _id: id })
      .then(user => {
        if (!user) {
          console.log("no user");
        }
       
        const newOrder = {
        productId: productId,
        stock: stock,
        totalAmount: totalAmount,
      };

      user.orders.push(newOrder);
        user.save()
          .then(result => res.json(result))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
})




router.get('/myOrders/:id', (req, res) => {
  const { id } = req.params;

  userModel.findById({ _id: id })
  .populate('orders.productId', 'name image type stock description price')
  .then(user => {
       
      res.json({ orders: user.orders });  
  })
  .catch(err => res.status(500).json({ error: err.message }));

});





module.exports=router