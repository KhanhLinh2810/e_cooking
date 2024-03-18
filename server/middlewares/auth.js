
// Importing the necessary modules
const jwt = require('jsonwebtoken');
const User = require('../models/User')

// Defining the authentication function
async function auth(req, res, next) {
    // Extracting the token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('Bearer ')[1];
    // Checking if the token exists
    if (!token) {
        console.log('hi')
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Finding the user with the token id and decoded id
        const user = await User.findOne({ '_id': decoded._id});
        // Checking if the user exists
        if (!user.tokens.includes(token)) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Adding the user object to the request
        req.user = user;
        req.token = token;
        
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }

}


module.exports = {auth}