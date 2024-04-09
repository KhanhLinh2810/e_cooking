const { updateUser, 
        createUser, 
        deleteUser, 
        getUserById, 
        getUserByUsername,
        getUser } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router()

// CREATE
router.post('/user', createUser);

// UPDATE
router.patch('/user/:id', updateUser);

//DELETE
router.delete('/user/:id', deleteUser);

//GET
router.get('/user/:id', getUserById);
router.get('/user', auth, getUser);
router.get('/profile/:username', getUserByUsername);

module.exports = router;

