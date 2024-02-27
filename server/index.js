const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const path=require('path')
const accountRoutes=require('./routes/account')
const productsRoutes=require('./routes/Products')
const visitorRoutes=require('./routes/Visitors')
const app = express();
//middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));

//DB
mongoose.connect("mongodb://127.0.0.1:27017/shoppy")
    .then(res => console.log("DB Connected"))
    .catch(err => console.log(err));

    app.use(express.static(path.join(__dirname,'images')))
app.use('/account',accountRoutes)
app.use('/products',productsRoutes)
app.use('/visitors',visitorRoutes)

app.listen(5000, () => console.log("server is running on port 5000"));
