const express = require('express');
const User = require('../models/userModel.js');
const {getAllUsers, addNewUser,dynamicId,specialFunc} = require('../controllers/userControllers.js')

const router = express.Router();

router.get("/users/all",getAllUsers);

// Register Route 
router.post('/users/new',addNewUser);


// getting user by its id 
// this is example of dynamic and static user id 
// /userid/abhi
// /userid/pratham
router.get("/userid/:id", dynamicId);

router.get("/users/special",specialFunc)



module.exports = router ;






