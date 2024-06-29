const express = require('express');
const User = require('../models/userModel.js');
const {getAllUsers, registerUser,dynamicId,loginUser,specialFunc,getMyProfile,logout} = require('../controllers/userControllers.js')
const {isAuthenticated} = require('../middlewares/auth.js');
const router = express.Router();

router.get("/users/all",getAllUsers);

// Register Route 
router.post('/new',registerUser);
router.post('/login',loginUser);
router.get("/me",isAuthenticated,getMyProfile);
router.get('/logout',logout)

// getting user by its id 
// /userid/abhi
// /userid/pratham
router.get("/userid/:id", dynamicId);

router.get("/users/special",specialFunc)



module.exports = router ;






