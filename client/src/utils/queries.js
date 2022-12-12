import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      firstname
      bio
      image
      linkedBy
      matches {
        user1
        user2
        chatId
        createdAt
      }
    }
  }
`;

export const ALL_USER = gql`
query users{
  users {
    _id
    username
    firstname
    bio
    image
    likedBy
  }
}
`

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
