const { default: userEvent } = require("@testing-library/user-event");
//require authentication error from apollo server express
const { AuthenticationError } = require("apollo-server-express");
const { User, Match, Chat } = require("../models");
//require signToken from utils/auth
const { signToken } = require("../utils/auth");
// resolvers are the functions executed when a client requests data from the server
const resolvers = {
  Query: {
    // get logged in user
    me: async (parent, args, context) => {
      return User.findById(context.user._id);
    },
    // get user by id and populate their matches
    user: async (parent, { userId }) => {
      return User.findById(userId);
    },
    // get all users and populate their likedBy field
    users: async (parent, args, context) => {
      console.log("serverside action");
      return User.find().populate("likedBy");
      // return allButMe = allUser.filter(user => { user._id !== context.user._id });
      // return allButMe.filter(user => { user.likedBy )
    },
    // get all matches for logged in user
    myMatches: async (parent, args, context) => {
      console.log("getting all matches for logged in user");
      return User.findById(context.user._id);
    },
    // get match by id and populate chat id
    match: async (parent, args) => {
      return Match.findById(args.matchId).populate("chatId");
    },
    // get all matches and populate chat id
    matches: async () => {
      return Match.find().populate("chatId");
    },
    // get chat by id
    getChat: async (parent, { chatId }) => {
      return Chat.findById(chatId);
    },
  },
  // mutations are functions that allow clients to modify data on the server
  Mutation: {
    //create user
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

    // create match and update both users with the match and create chat and update match with chat id
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
        { new: true, upsert: true }
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
      //if user does not exist, throw error
      if (!user) {
        throw new AuthenticationError(`User with ${email} does not exist`);
      }
      //if user exists, validate password
      const PasswordOK = await user.validatePW(password);
      console.log(PasswordOK);
      //if password is incorrect, throw error
      if (!PasswordOK) {
        throw new AuthenticationError(`Error: Incorrect Password`);
      }
      //if password is correct, create token
      const token = signToken(user);
      console.log(token);
      console.log(user);
      //return token and user
      return { token, user };
    },
  },
};

module.exports = resolvers;
