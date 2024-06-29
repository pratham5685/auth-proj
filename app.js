const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
// importing Routers
const {config} = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./Data/database.js');
config({
    path : './Data/config.env'
});
const eventHandler = require('./middlewares/errorHandler.js');

const userRouter = require('./Routes/userRoutes.js');
const taskRouter = require('./Routes/taskRoutes.js');

const app = express();


// <---------- MiddleWare------------------------>

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin :[process.env.FRONTEND_URL],
    methods :["GET","POST","PUT","DELETE"],
    credentials :true,
}));
app.use(userRouter);
app.use(taskRouter);


// <----------Database connection---------------->

connectDB()

// <----------------- API'S--------------------->


app.get("/",(req,res)=>{
    res.send('Wassup gays!')
});




app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
    
});


// error handling using middleware

app.use(eventHandler);

