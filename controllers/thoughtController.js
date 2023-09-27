// Import user and thought models
const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
    //   display all thoughts in json format
      res.json(thought);
    //   error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought by its id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
    //   ommit the version
        .select('-__v');

      if (!thought) {
        // Display a message if there is no thought with that id
        return res.status(404).json({ message: 'No thought with that ID' });
      }
    //   Displays the thought in json format
      res.json(thought);
      // Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
        // Create a thought and update the thoughts array of the user
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate({ _id: req.body.userId },
       { $push: { thoughts: thought._id } },
       { new: true } );
        if (!user) {
            // Displays a message if there is no user with that id
            res.status(404).json({ message: 'No user with that ID' });
        }
        // Displays the new thought in  json format
      res.json(thought);
    //   Error handling
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
        // Delete the thought with the specified id
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        // Displays a message if there is no thought with that id
        res.status(404).json({ message: 'No thought with that ID' });
      }
    //   Displays a message confirming the thought has been deleted
      res.json({ message: 'Thought deleted!' });
    //   Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
        // Update the thought with the specified id
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        // Displays a message if there is no thought with that id
        res.status(404).json({ message: 'No thought with this id!' });
      }
        // Displays the updated thought in json format
      res.json(thought);
    //   Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },

   // Add an reaction to a thought
   async addReaction(req, res) {
    try {
        // Add a reaction by updating the reactions array in the thought model
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        // Displays a message is there is no thought with that id
        res.status(404).json({ message: 'No thought found with this ID :(' });
      }
        // Display the thought with the reaction added to it in json format
      res.json(thought);
    //   Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
        // Remove a reaction by updating the reactions array in the thought model
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId} } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        // Displays a message if there is no thought with that id
        res.status(404).json({ message: 'No thought found with this ID :(' });
      }
        // Display the thought with the reaction removed in json format
      res.json(thought);
    //   Error handling
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
