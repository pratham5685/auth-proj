const mongoose = require('mongoose');

const connectDB = () => {
    
    mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('Connection error:', err));

};

module.exports = {connectDB};