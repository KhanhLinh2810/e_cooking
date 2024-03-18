const User = require("../models/User");
const bcryptjs = require('bcryptjs');


const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username: username });
        if( !user ) {
            res.status(400).json({ message: "username is not correct" })
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if( !isPasswordCorrect ) {
            return res.status(400).json({ message: "password is not correct"})
        }
        const token = await user.generateAuthToken();
        await user.save();
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).send(err)
    }
}

const logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token !== req.token;
      });
      await req.user.save();
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    login,
    logout,
}