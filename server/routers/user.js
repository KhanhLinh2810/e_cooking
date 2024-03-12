const { updateUser, createUser, deleteUser, getUser } = require('../controllers/userController');

const router = require('express').Router()

// CREATE
router.post('/user', createUser);

// UPDATE
router.patch('/user/:id', updateUser);

//DELETE
router.delete('/user/:id', deleteUser);

//GET
router.get('/user', getUser);




module.exports = router;

