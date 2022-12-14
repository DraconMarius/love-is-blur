import { gql } from '@apollo/client';

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


export const GET_USER = gql`
  query user($userId: ID!) {
    user {
      _id
      username
      email
      firstname
      bio
      image
      likedBy
      matches {
        user1
        user2
        chatId
        createdAt
      }
    }
  }
`;

export const MY_MATCHES = gql`
  query myMatches{
    myMatches{
      _id
      username
      matches
    }
  }

`;

export const GET_CHAT = gql`
  query chat($chatId: ID!){
    chat{
      _id
      messages
    }
  }

`;
