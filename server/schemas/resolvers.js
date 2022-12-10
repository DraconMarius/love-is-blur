const { default: userEvent } = require('@testing-library/user-event');
const { AuthenticationError } = require('apollo-server-express');
const { User, Match, Chat } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return User.findById(context.user._id).populate('matches')
        },

        user: async (parent, { userId }) => {
            return User.findById(userId).populate('matches')
        },

        users: async () => {
            return User.find().populate('matches')
        },

        match: async (parent, args) => {
            return Match.findById(args.matchId).populate('chatId')
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, pw }) => {
            const newUser = await User.create({ username, email, pw });
            //after created User, create JWT
            const token = signToken(newUser);
            //returning object that matches CreateUserResult in typeDefs
            return { auth: token, user: newUser };
        },

        createMatch: async (parent, { user1, user2 }) => {

            const MatchData = { user1, user2 };

            const newMatch = await Match.create(MatchData);

            //update Both user with the created match
            await User.findByIdAndUpdate(
                user1,
                { $addToSet: { matches: newMatch._id } },
                { new: true }
            )

            await User.findByIdAndUpdate(
                user2,
                { $addToSet: { matches: newMatch._id } },
                { new: true }
            )
            return (newMatch);
        },
        //create Chat with first message, update Match with the newly created chatID
        firstMessage: async (parent, { matchId, messageInput }) => {
            const newChat = await Chat.create(messageInput);
            const updateMatch = await Match.findByIdAndUpdate(
                matchId,
                { chatId: newChat._id },
                { new: true }
            );

            console.log(updateMatch);

            return (newChat);
        },
        //create message will find the chat by ID, add the newly created message in the array.
        createMessage: async (parent, { chatId, messageInput }) => {
            const updateChat = await Chat.findByIdAndUpdate(
                chatId,
                { $push: { messages: messageInput } },
                { new: true }
            );

            return (updateChat);
        },

    },
};

module.exports = resolvers;