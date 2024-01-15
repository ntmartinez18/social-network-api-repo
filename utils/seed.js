const connection = require('../config/connection');

// Import the User and Thought models
const User = require('../models/User');
const Thought = require('../models/Thought');

connection.on('error', (err) => {
  console.error(err);
});

// Wrap the seed data insertion in an async function
const seedDatabase = async () => {
  try {
    // Insert a user
    const user = await User.create({
      username: 'lernantino',
      email: 'lernantino@gmail.com'
    });

    // Insert a thought
    await Thought.create({
      thoughtText: "Here's a cool thought...",
      username: 'lernantino',
      userId: user._id
    });

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Call the seedDatabase function to insert the seed data
seedDatabase();