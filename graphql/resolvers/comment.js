const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const checkAuth = require('../../utils/check-auth');
module.exports = {
  Mutation: {
    async createComment(parent, { postId, body }, context) {
      // console.log(context)
      //   console.log(checkAuth(context));
      /* checkAuth(context) return :
                    {
                    id: '61fdb88f3b59eadd2f038e24',
                    email: 'mo@email.com',
                    username: 'mo',
                    iat: 1644134853,
                    exp: 1644138453
                    }
        */
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment!', {
          errors: {
            body: 'Comment body must not be empty.',
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        // put newest post on the top
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toDateString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found!');
      }
    },
    async deleteComment(parent, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          comment => comment.id === commentId
        );
        // console.log('HEY11111!', commentIndex);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
        //   console.log('HEY2222!', post.comments.splice(commentIndex, 1));
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed!');
        }
      } else {
        throw new UserInputError('Post not found!');
      }
    },
  },
};
