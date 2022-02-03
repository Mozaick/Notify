const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Post = require('./models/post');

dotenv.config({ path: './config.env' });

const DB = process.env.MONGO_URI;
const mongoOpts = {
  useNewUrlParser: true,
};

mongoose
  .connect(DB, mongoOpts)
  .then(() => console.log('DB connection successful! 👍'));

const typeDefs = gql`
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    // sayHi: () => 'Hello World From the Server!!',
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

const port = process.env.PORT || 8000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
