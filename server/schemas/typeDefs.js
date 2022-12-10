const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    matches: [Match]
}


type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    user(userID: String!): User

}


type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    
}


`;

module.exports = typeDefs