const gql = require('graphql-tag');

exports.typeDefs = gql`
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
