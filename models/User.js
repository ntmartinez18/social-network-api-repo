const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: '/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,'
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    });
    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
      });

const User = model('User', userSchema);

module.exports = User;
