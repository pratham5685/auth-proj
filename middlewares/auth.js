const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')
const isAuthenticated = async (req,res,next) =>{
  

    const {token} = req.cookies || req.header('Authorization').replace('Bearer ', '');

    if(!token){
        res.json({
            success : false,
            message : "please login first!"
        })
    };

    const decoded = jwt.verify(token,"ccn");
    req.user = await User.findById(decoded._id);
    next();
    

};


module.exports = {isAuthenticated};