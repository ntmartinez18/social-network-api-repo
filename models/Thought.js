const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toISOString(),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema], // Assuming you have defined the `reactionSchema`
    }, {
      toJSON: { virtuals: true },
      id: false,
    });
    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
      });
      
      const Thought = mongoose.model('Thought', thoughtSchema);
      
      module.exports = Thought;