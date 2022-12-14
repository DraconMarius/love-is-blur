const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    firstname: String!
    bio: String!
    likedBy: [String]
    matches: [Match]
    image: String
  }

  type Match {
    _id: ID
    user1: ID!
    user2: ID!
    chatId: Chat
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

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      firstname: String!
      bio: String!
      image: String
    ): Auth
    login(email: String!, password: String!): Auth
    createMatch(user1: ID!, user2: ID!): Match
    createMessage(chatId: ID!, messageInput: messageInput): Chat
    updateUser(userId: ID!, likedBy: ID!): User
    deleteUser(userId: ID!): User
    editUser(
      userId: ID!
      bio: String
      image: String
      firstname: String
      username: String
      email: String
    ): Auth
  }
`;

// firstMessage(matchId: ID!, messages: [messageInput]): Chat
module.exports = typeDefs;
