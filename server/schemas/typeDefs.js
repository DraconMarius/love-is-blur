const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    firstname: String!
    bio: String!
    likedBy: [User]
    matches: [Match]
  }

  type Match {
    _id: ID
    user1: ID!
    user2: ID!
    chatId: [Chat]
    createdAt: String
  }

  type Chat {
    _id: ID
    messages: [Message]
  }

  type Message {
    _id: ID
    messageText: String!
    messageAuthor: String!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input messageInput {
    messageText: String!
    messageAuthor: String!
  }

  type Query {
    me: User
    user(userId: ID!): User
    users: [User]
    match(matchID: ID!): Match
  }

  type CreateUserResult {
    auth: Auth
    user: User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
    ): CreateUserResult
    createMatch(user1: ID!, user2: ID!, chatId: ID): Match
    firstMessage(matchId: ID!, messages: [messageInput]): Chat
    createMessage(chatId: ID!, message: messageInput): Chat
  }
`;

module.exports = typeDefs;
