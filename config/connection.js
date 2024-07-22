// Load environment variables from .env file
require('dotenv').config();

// Import Sequelize constructor from the Sequelize library
const { Sequelize } = require('sequelize');

// Initialize a variable to hold the Sequelize instance
let sequelize;

// Check if JAWSDB_URL is set in the environment variables
if (process.env.JAWSDB_URL) {
  // Create a new Sequelize instance using the JAWSDB_URL for remote database connection
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Create a new Sequelize instance for local database connection
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PW,   // Database password
    {
      host: 'localhost',  // Database host
      dialect: 'mysql',   // Database dialect
      port: 3306          // Database port
    }
  );
}

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;
