// Import user and thought models
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      // Displays all users in json format
      res.json(users);
      // Error handling
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        // Ommit the version
        .select('-__v');

      if (!user) {
        // Display a message if there is no user with that id
        return res.status(404).json({ message: 'No user with this ID' })
      }
      // Display the user in json format
      res.json(user);
      // Error handling
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      // Create a new user with the data provided in the request body
      const user = await User.create(req.body);
      // Display the new user in json format
      res.json(user);
      // Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      // Update the user with the specified id
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        // Displays a message if there is no user with that id
        res.status(404).json({ message: 'No user with this id!' });
      }
      // Displays the updated user in json format
      res.json(user);
      // Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      // Delete the user with the specified id
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        // Displays a message if there is no user with that id
        return res.status(404).json({ message: 'No such user exists' });
      }
      // Displays a message confirming the user has been deleted
      res.json({ message: 'user successfully deleted' });
      // Error handling
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an friend to a user
  async addFriend(req, res) {
    try {
      // Add a friend by updating the friends array in the user model
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        // Displays a message if there is no user with that id
        return res.status(404).json({ message: 'No user found with this ID :(' });
      }
      // Display the user with the updated friend in json format
      res.json(user);
      // Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      // Remove a friend by updating the friends array in the user model
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        // Displays a message if there is no user with that id
        return res.status(404).json({ message: 'No user found with this ID :(' });
      }
      // Display the user with the friend removed in json format
      res.json(user);
      // Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
