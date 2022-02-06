const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      username: String,
      body: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
