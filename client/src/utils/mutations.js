import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username:$username, email:$email, password:$password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const CREATE_MATCH = gql`
    mutation createMatch($user1: String!, $user2: String!) {
        createMatch(user1:$user1, $user2:user2){
            _id
            user1
            user2
            chatId
            createdAt
        }
    }
`;

export const firstMessage = gql`
    mutation firstMessage($matchId: ID!, $messageInput: [messageInput]) {
        firstMessage(matchId: $matchId, messageInput: $messageInput){
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

export const createMessage = gql`
    mutation createMessage($chatId: ID!, $messageInput: messageInput) {
        createMessage(chatId: $chatId ,$messageInput: messageInput){
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