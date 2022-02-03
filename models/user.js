const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  PasswordConfirm: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model(User, userSchema);

module.exports = User;
