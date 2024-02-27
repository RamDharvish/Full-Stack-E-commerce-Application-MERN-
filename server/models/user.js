// const mongoose = require('mongoose')

// const userSchema=mongoose.Schema({
//     name:String,
//     email:{
//         type:String,
//         unique:true
//     },
//     password:String,
//     role:{
//         type:String,
//         default:"visitor"
//     },
//    cart:[{
//     productId:{
//         type: mongoose.Schema.Types.ObjectId,
//             ref: 'Products'
//     }
//    }],
//    orders:[{
//     productId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Products'
//     },
//     stock:Number,
//     totalAmount:Number
//    }]
// })

// const userModel=mongoose.model('user',userSchema)

// module.exports=userModel



const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: "visitor"
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    }],
    orders: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        stock: Number,
        totalAmount: Number,
    }]
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
