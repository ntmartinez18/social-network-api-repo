const { User, Thought } = require('../models');

// get all users
module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single user by id and populate thought and friend data
    async getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);

    } catch (err) {
        res.status(500).json(err);
    }
},
    // create a new user
    async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},
// update a user
async updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!user) {
            res.status(404).json({ message: 'NO user with this id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err)
    }
},
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ username: user.username });
      res.json({ message: 'user and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
}}