const express = require('express');

const app = express();
// middleware for json

app.use(express.json());



const User = require('../models/userModel.js')

const getAllUsers = async (req,res)=>{

    const users = await User.find({});

    console.log(req.query)


    res.json({
        success : true,
         users,
    });
};

const addNewUser = async (req,res)=>{
    
     const {name,email,password} = req.body;

     const data =  await User.create({name,email,password});
    // we get pratham
    
 
    res.json({
        success : true,
        data,
       
    });
};


const dynamicId = async (req,res)=>{
    

    // we get pratham
    
    const idValue = req.params.id ;

    const user = await User.findById(idValue);
    res.json({
        success : true,
        user,
    });
};

const specialFunc = (req,res)=>{
    res.json({
        success:true,
        message : "just joking !",
    })
}

module.exports = {getAllUsers, addNewUser ,dynamicId ,specialFunc};