const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

dotenv.config({ path: './config.env' });

const DB = process.env.MONGO_URI;

const mongoOpts = {
  useNewUrlParser: true,
};

mongoose
  .connect(DB, mongoOpts)
  .then(() => console.log('DB connection successful! 👍'));

const port = process.env.PORT || 8000;
const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ req }) => ({ req }),
});

server
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
