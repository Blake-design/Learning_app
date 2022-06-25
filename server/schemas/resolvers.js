const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userName }) => {
      return User.findOne({ userName }).populate("settings");
    },

    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const user = await User.findOne({
          userName: context.user.userName,
        }).populate("settings");
        return user;
      }
      throw new AuthenticationError("Please login to view your profile.");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Oops you entered the wrong credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Oops you entered the wrong credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (
      parent,
      { firstName, lastName, userName, email, password }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        userName,
        password,
        email,
        joined: Date.now(),
      });

      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ userName: context.user.userName });
      }
      throw new AuthenticationError("Please log in");
    },
  },
};
module.exports = resolvers;
