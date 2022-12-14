const { default: userEvent } = require("@testing-library/user-event");
const { AuthenticationError } = require("apollo-server-express");
const { User, Match, Chat } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findById(context.user._id);
    },

    user: async (parent, { userId }) => {
      return User.findById(userId).populate("matches");
    },

    users: async (parent, args, context) => {
      console.log("serverside action");
      return User.find().populate("likedBy");
      // return allButMe = allUser.filter(user => { user._id !== context.user._id });
      // return allButMe.filter(user => { user.likedBy )
    },

    match: async (parent, args) => {
      return Match.findById(args.matchId).populate("chatId");
    },
  },

  Mutation: {
    createUser: async (
      parent,
      { username, email, password, firstname, bio, image }
    ) => {
      const newUser = await User.create({
        username,
        email,
        password,
        firstname,
        bio,
        image,
      });
      //after created User, create JWT
      const token = signToken(newUser);
      //returning object that matches CreateUserResult in typeDefs
      return { token, newUser };
    },

    createMatch: async (parent, { user1, user2 }) => {
      console.log("match creation?");
      console.log(user1);
      const newMatch = await Match.create({ user1, user2 });
      const newChat = await Chat.create({});
      const updateMatch = await Match.findByIdAndUpdate(
        newMatch._id,
        { chatId: newChat._id },
        { new: true }
      );

      console.log(updateMatch);

      //update Both user with the created match
      await User.findByIdAndUpdate(
        user1,
        { $addToSet: { matches: newMatch._id } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        user2,
        { $addToSet: { matches: newMatch._id } },
        { new: true }
      );
      return updateMatch;
    },

    // //create Chat with first message, update Match with the newly created chatID
    // firstMessage: async (parent, { matchId, messageInput }) => {
    //     const newChat = await Chat.create(messageInput);
    //     const updateMatch = await Match.findByIdAndUpdate(
    //         matchId,
    //         { chatId: newChat._id },
    //         { new: true }
    //     );

    //     console.log(updateMatch);

    //     return newChat;
    // },

    //create message will find the chat by ID, add the newly created message in the array.
    createMessage: async (parent, { chatId, messageInput }) => {
      const updateChat = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { messages: messageInput } },
        { new: true }
      );

      return updateChat;
    },

    //update user's likedBy
    updateUser: async (parent, { userId, likedBy }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { likedBy: likedBy } },
        { new: true }
      );
      return updatedUser;
    },

    //delete user
    deleteUser: async (parent, { userId }) => {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    },

    //update user's profile info
    editUser: async (
      parent,
      { userId, username, bio, email, image, firstname }
    ) => {
      const editedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          username: username,
          bio: bio,
          email: email,
          image: image,
          firstname: firstname,
        },
      });
      const token = signToken(editedUser);
      return { token, editedUser };
    },

    //login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw new AuthenticationError(`User with ${email} does not exist`);
      }

      const PasswordOK = await user.validatePW(password);
      console.log(PasswordOK);

      if (!PasswordOK) {
        throw new AuthenticationError(`Error: Incorrect Password`);
      }

      const token = signToken(user);
      console.log(token);
      console.log(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
