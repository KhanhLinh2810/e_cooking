const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); // require bcryptjs here
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    require:true
  },
  lastName: {
    type: String,
    require:true
  },
  avatar: {
    type: String, 
    default: function() {
      return this.firstName.charAt(0) + this.lastName.charAt(0);
    }
  },
  tokens: [
    String
  ]
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;