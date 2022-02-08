const postsResolvers = require('./post');
const usersResolvers = require('./user');
const commentsResolvers = require('./comment');

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  }
};
