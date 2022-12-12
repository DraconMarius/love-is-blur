import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $firstname: String!
    $bio: String!
    $image: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      firstname: $firstname
      bio: $bio
      image: $image
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_MATCH = gql`
  mutation createMatch($user1: String!, $user2: String!) {
    createMatch(user1: $user1, user2: $user2) {
      _id
      user1
      user2
      chatId
      createdAt
    }
  }
`;

// export const FIRST_MSG = gql`
//   mutation firstMessage($matchId: ID!, $messageInput: [messageInput]) {
//     firstMessage(matchId: $matchId, messageInput: $messageInput) {
//       _id
//       messages {
//         _id
//         messageText
//         messageAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const CREATE_MESSAGE = gql`
  mutation createMessage($chatId: ID!, $messageInput: messageInput) {
    createMessage(chatId: $chatId, messageInput: $messageInput) {
      _id
      messages {
        _id
        messageText
        messageAuthor
        createdAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $likedBy: ID!) {
    updateUser(userId: $userId, likedBy: $likedBy) {
      _id
      username
      email
      firstname
      bio
      likedBy
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
