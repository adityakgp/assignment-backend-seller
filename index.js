const express = require('express')
const  mongoose = require('mongoose')
const findSellerRoutes = require('./routes/findSellerRoutes');
const sellersRoutes = require('./routes/sellersRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const app = express()

app.use(express.json());

app.use('/api', findSellerRoutes);
app.use('/api', sellersRoutes);
app.use('/api', catalogRoutes);

mongoose.connect("mongodb+srv://adityadasc24:QrMbv3ZNjrzyH634@backenddb.3pjzxaz.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("connected to database!")
    app.listen(3000, ()=>{
        console.log("server running on 3000")
    })
})
.catch(()=>{
    console.log("connection failed!")
})