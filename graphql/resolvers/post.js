const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/postModel');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
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
      const user = checkAuth(context);
      console.log(user);

      if (args.body.trim() === '') {
        throw new Error('Post Body must not be empty.');
      }

      const newPost = new Post({
        username: user.username,
        user: user.id,
        body,
        createdAt: new Date().toISOString(),
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
    async likePost(parent, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          // post already liked, unlike it
          // only leave likes made by anyone BUT the username
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // post not liked, like it
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        // save it to the db
        await post.save();
        return post;
      } else throw new UserInputError('Post not found!');
    },
  },
};
