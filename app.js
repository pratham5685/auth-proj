const express = require('express');
const mongoose = require('mongoose');
// importing Routers
const {config} = require('dotenv');

config({
    path : './Data/config.env'
})

const userRouter = require('./Routes/userRoutes.js');
const { connectDB } = require('./Data/database.js');

const app = express();


// <---------- MiddleWare------------------------>

app.use(express.json());
app.use(userRouter);

// <----------Database connection---------------->

connectDB()

// <----------------- API'S--------------------->


app.get("/",(req,res)=>{
    res.send('Wassup gays!')
});




app.listen(process.env.PORT,()=>{
    console.log('http://localhost:3000');
    
});

