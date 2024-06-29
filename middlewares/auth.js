const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token is missing',
        });
    }

    try {
        const decoded = jwt.verify(token, "ccn");
        req.user = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};


module.exports = {isAuthenticated};