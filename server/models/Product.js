const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:String,
    type:String,
    stock:Number,
    price:Number,
    description:String,
    image:String
})

const productModel=mongoose.model("Products",productSchema)

module.exports=productModel