const { default: userEvent } = require('@testing-library/user-event');
const { AuthenticationError } = require('apollo-server-express');
const { User, Match } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return User.findById(context.user._id).populate('matches')
        },

        user: async (parent, args) => {
            return User.findById(args.userID).populate('matches')
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            //after created User, create JWT
            const token = signToken(newUser);

            return (token, newUser);
        },

    }
};

module.exports = resolvers;