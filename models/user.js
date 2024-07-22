// Import necessary modules from sequelize and bcrypt
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Define the User class extending the Sequelize Model
class User extends Model {
    // Method to compare the provided password with the hashed password
    validatePassword(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    }
}

// Initialize the User model with fields and configurations
User.init(
    {
        // Unique identifier for each user
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        // User's unique username
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Optional Twitter handle
        twitter: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Optional GitHub username
        github: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // User's email, must be unique and valid
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validates email format
            }
        },
        // User's password, with minimum length validation
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] // Ensures password length is at least 4 characters
            }
        }
    },
    {
        // Lifecycle hooks for password hashing
        hooks: {
            // Hash password before creating a new user
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            // Hash password before updating an existing user
            async beforeUpdate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            }
        },
        // Model settings
        sequelize,
        modelName: 'user', // Specify the model name
        freezeTableName: true, // Prevent table name from being pluralized
        underscored: true, // Use snake_case for table and column names
        timestamps: false // Disable automatic timestamps
    }
);

// Export the User model for use in other parts of the application
module.exports = User;
