const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    pw: String!
    matches: [Match]
  }

  type Match {
    _id: ID
    user1: String!
    user2: String!
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
    user(userID: String!): User
    users: [User]
    match(userID: String!): Match
  }

  type CreateUserResult {
    auth: Auth
    user: User
  }

  type Mutation {
    createUser(username: String!, email: String!, pw: String!): CreateUserResult
    createMatch(user1: String!, user2: String!, chatId: String): Match
    firstMessage(matchId: String, messages:[messageInput]): Chat
    createMessage(chatId: ID!, message: messageInput): Chat
  }
`;

module.exports = typeDefs;
