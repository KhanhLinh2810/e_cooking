const { updateUser, createUser, deleteUser } = require('../controllers/userController');

const router = require('express').Router()

// CREATE
router.post('/users', createUser);

// UPDATE
router.patch('/users/:id', updateUser);

//DELETE
router.delete('/user/:id', deleteUser);


module.exports = router;

