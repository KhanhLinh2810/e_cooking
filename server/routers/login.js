const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { login, logout } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', auth, logout);

module.exports = router;