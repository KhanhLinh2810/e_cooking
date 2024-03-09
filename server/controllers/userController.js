const User = require("../models/User");


const createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        token: []
    });

    try {
        //validations
        if(!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({message: 'All fields are required!'})
        };
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.log('createUser have error: ', error);
        res.status(400).send(error);
    }
}

// const getAuthenticatedUser = async (req, res) => {
//     try {
//         const user = await User.findOne({ tokens: { $in: [req.token] } }).po
//     }
// }

const updateUser = async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'email', 'avatar'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invaid updates!' });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
        if(!user) {
            return res.status(404).send(req.params);
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).json({ message: "User deleted successfully"})
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
}
