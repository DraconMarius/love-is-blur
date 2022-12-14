import { gql } from "@apollo/client";
// client side mutations for our graphql server so that we can use them in our react components
//create user mutation that takes in the username, email, password, firstname, bio, and image and creates a user with that info  and returns a token with the user id and username
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
// create match mutation  that takes in the user1 and user2 id's and creates a match between them and returns the match id, user1 id, user2 id, and the created at date
export const CREATE_MATCH = gql`
  mutation createMatch($user1: ID!, $user2: ID!) {
    createMatch(user1: $user1, user2: $user2) {
      _id
      user1
      user2
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
// create message mutation that takes in the chat id and the message input and creates a message with that info and returns the message id, message text, message author, and the created at date
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

// update user mutation that takes in the user id and the liked by id and updates the user with that info and returns the user id, username, email, firstname, bio, and liked by
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
// edit user mutation that takes in the user id, username, firstname, email, bio, and image and updates the user with that info and returns a token with the user id, username, email, firstname, bio, and image
export const EDIT_USER = gql`
  mutation editUser(
    $userId: ID!
    $username: String!
    $firstname: String!
    $email: String!
    $bio: String!
    $image: String
  ) {
    editUser(
      userId: $userId
      username: $username
      firstname: $firstname
      email: $email
      bio: $bio
      image: $image
    ) {
      token
      user {
        _id
        username
        email
        firstname
        bio
        image
      }
    }
  }
`;

// login mutation that takes in the email and password and returns a token with the user id and username
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

//delete user mutation that takes in the user id and deletes the user with that id and returns the user id
export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`;
// get chat mutation that takes in the chat id and returns the messages with the message text, message author, and the created at date
export const GET_CHAT = gql`
  mutation chat($chatId: String!) {
    chat(chatId: $chatId) {
      messages {
        messageText
        messageAuthor
        createdAt
      }
    }
  }
`;
