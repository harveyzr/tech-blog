// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment class that extends Sequelize's Model
class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init(
  {
    // Unique identifier for each comment
    id: {
      type: DataTypes.INTEGER, // Data type for the ID
      primaryKey: true,        // Marks this field as the primary key
      allowNull: false,        // This field cannot be null
      autoIncrement: true       // Automatically increments the ID
    },
    // Foreign key referencing the user who made the comment
    user_id: {
      type: DataTypes.INTEGER, // Data type for user ID
      allowNull: false,        // This field cannot be null
      references: {
        model: 'user',         // References the 'user' model
        key: 'id'              // References the 'id' field in the user model
      }
    },
    // Foreign key referencing the post associated with the comment
    post_id: {
      type: DataTypes.INTEGER, // Data type for post ID
      allowNull: false,        // This field cannot be null
      references: {
        model: 'post',         // References the 'post' model
        key: 'id'              // References the 'id' field in the post model
      }
    },
    // The text content of the comment
    comment_text: {
      type: DataTypes.STRING,  // Data type for the comment text
      allowNull: false,        // This field cannot be null
      validate: {
        len: [1]               // Ensures the comment text has at least one character
      }
    }
  },
  {
    sequelize,                // Pass the sequelize instance
    freezeTableName: true,    // Prevents Sequelize from pluralizing the table name
    underscored: true,        // Uses snake_case for column names
    modelName: 'comment'      // Sets the model name to 'comment'
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
