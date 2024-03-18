const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { login, logout, checkLogined } = require('../controllers/authController');

// Login 
router.post('/login', login);

// Logout 
router.post('/logout', auth, logout);

module.exports = router;