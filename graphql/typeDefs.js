const gql = require('graphql-tag');

exports.typeDefs = gql`
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput{
    username: String!
    email: String!
    password: String!
    passwordConfirm: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    # register is the fn() .. registerInput is the 'arg'
  }
`;
