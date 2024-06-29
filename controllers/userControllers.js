const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
// middleware for json

app.use(express.json());



const User = require('../models/userModel.js')

const getAllUsers = async (req,res)=>{


};

const registerUser = async (req,res)=>{
    const { name, email, password } = req.body;

    // Find user in the database
    let user = await User.findOne({ email });

    // If user found in the database, throw error
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        
        });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create new user and store the created user in the user variable
    const createdUser = await User.create({
        name,
        email,
        password: hashedPass,
    });

    // Generate token using the _id of the newly created user
    const token = jwt.sign({ _id: createdUser._id }, "ccn");

    // Set the token as a cookie and send the response
    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure : process.env.NODE_ENV === "Development" ? "false" : "true",
    }).json({
        success: true,
        message: "User created successfully!",
    });

};

const loginUser = async (req,res,next) => {
  try {
    const {email,password} = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser) return next(new Error('Email or password is incorrect! '))

    const isMatch = await bcrypt.compare(password,existingUser.password);

    if(!isMatch) return next(new Error('Email or password is incorrect! '));

    // generate token
    const token =  jwt.sign({
        _id : existingUser._id
    },"ccn")
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV === "Development");

    res.status(201).cookie("token",token,{
        httpOnly : true,
        maxAge : 120000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        //  secure: process.env.NODE_ENV === "Development", // secure should be a boolean
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        message : "login in successfull ! "
    });
    
  } catch (error) {
      next(error)
  }
    
};

const getMyProfile = (req, res) => {
   try {
    res.json({
        message: "got em",
        user : req.user,
    });
    
   } catch (error) {
      next(error)
   }
};


const logout = (req,res) =>{
  try {
    res.cookie("token","",{
        expires :  new Date (Date.now()),
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure : process.env.NODE_ENV === "Development" ? "false" : "true",
    }).json({
        success : true,
        message : "logout out successfull"
    });

  } catch (error) {
    next(error);
  }

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

module.exports = {getAllUsers, registerUser,dynamicId ,loginUser,specialFunc , getMyProfile, logout };