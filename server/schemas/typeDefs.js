// This file defines the schema for the GraphQL API
//import gql so we can parse the schema
const { gql } = require("apollo-server-express");

// create typeDefs. typeDefs is a string that defines the schema for the GraphQL API. it tells the server what data is available and how it can be fetched

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    firstname: String!
    bio: String!
    likedBy: [String]
    matches: [String]
    image: String
  }

  type Match {
    _id: ID
    user1: ID!
    user2: ID!
    chatId: String
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
    myMatches: User
    matches: [Match]
    getChat(chatId: String!): Chat
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
    chat(chatId: ID!): Chat
  }
`;

// firstMessage(matchId: ID!, messages: [messageInput]): Chat
module.exports = typeDefs;
