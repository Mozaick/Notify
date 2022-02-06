const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/postModel');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        // posts will be listed in an ascending order
        // const posts = await Post.find();

        // posts will be listed in an descending order
        // -1 tells mongoose to change the order
        const posts = await Post.find().sort({ createdAt: -1 });

        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // you can omit arg 'context' and 'info'
    // if you are not going to use them
    // but you must keep 'parent'
    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('post not found!!');
        } else {
          return post;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(parent, { body }, context) {
      // Scenario:-
      // req obj is inside context
      // means i can access the headers, like Auth Header
      // to check if user is authenticated
      // we can do that all that inside of here
      // but since we will use this in multiple routes
      // we need to implement it in its own function
      // so we will create a file called check-auth in Utils directory

      // user logs in and gets an Authentication token
      // user needs to puts this token in the Authorization Header
      // Authorization: Bearer <token>
      // user send the Authorization Header with the request
      // and then we need to get that token and then decode it
      // and get info from it that tells us user is authenticated
      // and then create a post .. not any one can create a post

      const user = checkAuth(context);
      console.log(user);

      const newPost = new Post({
        username: user.username,
        body,
        createdAt: new Date().toISOString(),
        user: user.id,
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(parent, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new AuthenticationError('Post does not exist!');
        }
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully!!';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
