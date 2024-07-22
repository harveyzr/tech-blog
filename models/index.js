// Importing the necessary models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Establishing associations between models

// A User can create multiple Posts
User.hasMany(Post, {
    foreignKey: 'user_id', // Foreign key in Post table
});

// Each Post belongs to a single User
Post.belongsTo(User, {
    foreignKey: 'user_id', // Foreign key in Post table
});

// A Comment is associated with a single User
Comment.belongsTo(User, {
    foreignKey: 'user_id', // Foreign key in Comment table
});

// A Comment is linked to a specific Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id', // Foreign key in Comment table
});

// A User can have multiple Comments
User.hasMany(Comment, {
    foreignKey: 'user_id', // Foreign key in Comment table
});

// A Post can have multiple Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id', // Foreign key in Comment table
});

// Exporting the models for use in other parts of the application
module.exports = { User, Post, Comment };
