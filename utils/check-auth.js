const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('The Token is either Invalid or Expired');
      }
    }
    throw new Error("Authentication token must be 'Bearer <toke>' ");
  }
  throw new Error('Authorization Header Must Be Provided');
};
