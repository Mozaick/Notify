const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: String,
  body: String,
  createdAt: String,
  comments: [
    {
      username: String,
      body: String,
      createdAt: String,
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
