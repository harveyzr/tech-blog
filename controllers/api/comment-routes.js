// Import necessary modules
const express = require('express');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new router instance
const router = express.Router();

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        // Fetch all comments from the database
        const comments = await Comment.findAll({});
        res.json(comments); // Send the comments as a JSON response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while fetching comments.' }); // Send a 500 error response
    }
});

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    // Ensure the session exists
    if (req.session) {
        try {
            // Create a new comment using the request body and session user ID
            const newComment = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id, // Use the user ID from the session
            });
            res.json(newComment); // Send the newly created comment as a JSON response
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(400).json({ error: 'Failed to create comment.' }); // Send a 400 error response
        }
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' }); // Handle unauthorized access
    }
});

// Route to delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Attempt to delete the comment with the specified ID
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id // Use the ID from the request parameters
            }
        });

        // Check if the comment was found and deleted
        if (!deletedComment) {
            return res.status(404).json({ message: 'No comment found with this ID.' }); // Send a 404 error if not found
        }
        res.json({ message: 'Comment deleted successfully.' }); // Send a success message
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while deleting the comment.' }); // Send a 500 error response
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
