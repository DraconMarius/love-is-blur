import { gql } from '@apollo/client';

//client side queries for our graphql server so that we can use them in our react components
//query me that returns the user id, username, email, firstname, bio, and image
export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      email
      firstname
      bio
      image
      likedBy
    }
  }
`;
//query all users that returns the user id, username, email, firstname, bio, and image
export const ALL_USER = gql`
  query {
    users {
      _id
      firstname
      bio
      image
      likedBy
      matches
    }
  }
`;
//query match that takes in the match id and returns the match id, user1 id, user2 id, chat id, and the created at date
export const QUERY_MATCH = gql`
  query match($matchId: ID!) {
    match {
      _id
      user1
      user2
      chatId
      createdAt
    }
  }
`;

//query all matches that returns the match id, user1 id, user2 id, chat id, and the created at date
export const GET_ALL_MATCH = gql`
  query matches{
    matches {
      _id
      user1
      user2
      chatId
      createdAt
    }
  }
`

//query user that takes in the user id and return a match with the user id, username, email, firstname, bio, and image
export const GET_USER = gql`
  query user($userId: String!) {
    user {
      _id
      username
      email
      firstname
      bio
      images
    }
  }
`;
//query my matches that returns the user id, username, and matches
export const MY_MATCHES = gql`
  query myMatches{
    myMatches{
      _id
      username
      matches
    }
  }

`;
//query chat that takes in the chat id and returns the messages with that chaat id and the chat id, message id, message text, message author, and the created at date
export const GET_CHAT = gql`
  query getChat($chatId: String!){
    getChat(chatId: $chatId){
      _id
      messages{
        _id
        messageText
        messageAuthor
        createdAt
      }
    }
  }`;
