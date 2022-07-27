const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLogin,
} = require('../../utils/validators');

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
    ) {
      // 1) Validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        passwordConfirm
      );
      if (!valid) {
        // if NOT valid throw the errors obj
        throw new UserInputError('Validation Errors', { errors });
      }
      // 2) Make sure user does not exist
      const user = await User.findOne({ username });
      const userEmail = await User.findOne({ email });
      // return an error if user already exists
      if (user) {
        throw new UserInputError('Username already exists!', {
          // this error obj will be used later in the frontend
          errors: {
            username: 'Username is not available!',
          },
        });
      }
      if (userEmail) {
        throw new UserInputError('email already exists!', {
          errors: {
            email: 'this email is already registered!',
          },
        });
      }
      // 3) Hash pwd & create auth token

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password,
        passwordConfirm,
        createdAt: new Date().toISOString(),
      });

      // save newUser in DB
      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(parent, { username, password }, context, info) {
      const { errors, valid } = validateLogin(username, password);
      if (!valid) {
        throw new UserInputError('Validation Errors', { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User was not found!';
        throw new UserInputError('User not found!', { errors });
      }
      // check if password is correct
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'This password is not correct!';
        throw new UserInputError('Wrong credentials.', { errors });
      }

      // if all valid, create a new token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
