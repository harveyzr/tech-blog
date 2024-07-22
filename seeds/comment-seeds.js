// Import the Comment model from the models directory
const { Comment } = require('../models');

// Define an array of comment data to seed the database
const commentsToSeed = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "This is amazing!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "Wow, amazing work!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Awesome! Kudos to everyone who has contributed."
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "We just reached a million subscribers! Fantastic!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "This is great news!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "This is one of our biggest and most awaited features. Keep up the good work!"
    },
    {
        user_id: 5,
        post_id: 3,
        comment_text: "Very useful tool!"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Nice tool!"
    }
];

// Function to seed comments into the database
const seedComments = () => {
    // Use bulkCreate to insert multiple comments at once
    return Comment.bulkCreate(commentsToSeed);
};

// Export the seedComments function for use in other files
module.exports = seedComments;
