const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
  Mutation: {
    async register(
      // comes with 4 args;
      // Parent, Args, Context and Info
      // if any of these 4 args unused
      // they can be deleted
      // except 'parent' bcz gives access to 'Args'
      // which in this example are username, email, psw, pswConfirm
      parent,
      { registerInput: { username, email, password, passwordConfirm } },
      context,
      info
    ) {},
  },
};
