const { User, Thought } = require('../models');

// get all thoughts
module.exports = {
    // Get all thoughts
    async getThought(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: thought.user } });
            res.json({ message: 'thought and user deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Post to create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
    
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete to pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
                'reactions.reactionId': req.params.reactionId
            });
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought or reaction with that ID' });
            }
    
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};