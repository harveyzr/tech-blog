// Import necessary seed modules
const postSeeds = require('./post-seeds');
const userSeeds = require('./user-seeds');
const commentSeeds = require('./comment-seeds');

// Import the sequelize connection configuration
const dbConnection = require('../config/connection');

// Function to seed the database
const initializeDatabase = async () => {
  // Sync the database, dropping existing tables
  await dbConnection.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed users into the database
  await userSeeds();
  console.log('\n----- USERS SEEDED -----\n');

  // Seed posts into the database
  await postSeeds();
  console.log('\n----- POSTS SEEDED -----\n');

  // Seed comments into the database
  await commentSeeds();
  console.log('\n----- COMMENTS SEEDED -----\n');

  // Exit the process after seeding is complete
  process.exit(0);
};

// Execute the seeding function
initializeDatabase();
