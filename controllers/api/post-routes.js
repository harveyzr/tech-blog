// Import necessary modules
const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/', (req, res) => {
    console.log('Fetching all posts...');
    Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_content'],
        order: [['created_at', 'DESC']], // Order posts by creation date
        include: [
            {
                model: Comment, // Include comments related to the post
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User, // Include user details for each comment
                    attributes: ['username', 'twitter', 'github']
                }
            },
            {
                model: User, // Include user details for the post
                attributes: ['username', 'twitter', 'github']
            }
        ]
    })
    .then(posts => res.json(posts)) // Send the posts as a JSON response
    .catch(err => {
        console.error(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code for server errors
    });
});

// Route to get a single post by ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id }, // Find post by ID
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [
            {
                model: User, // Include user details for the post
                attributes: ['username', 'twitter', 'github']
            },
            {
                model: Comment, // Include comments related to the post
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User, // Include user details for each comment
                    attributes: ['username', 'twitter', 'github']
                }
            }
        ]
    })
    .then(post => {
        if (!post) {
            return res.status(404).json({ message: 'Post not found with this ID' }); // Handle case where post is not found
        }
        res.json(post); // Send the post as a JSON response
    })
    .catch(err => {
        console.error(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code for server errors
    });
});

// Route to create a new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id // Associate post with the logged-in user
    })
    .then(newPost => res.json(newPost)) // Send the created post as a JSON response
    .catch(err => {
        console.error(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code for server errors
    });
});

// Route to update an existing post by ID
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    }, {
        where: { id: req.params.id } // Specify which post to update
    })
    .then(updatedPost => {
        if (!updatedPost[0]) {
            return res.status(404).json({ message: 'Post not found with this ID' }); // Handle case where post is not found
        }
        res.json(updatedPost); // Send the updated post as a JSON response
    })
    .catch(err => {
        console.error(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code for server errors
    });
});

// Route to delete a post by ID
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: { id: req.params.id } // Specify which post to delete
    })
    .then(deletedPost => {
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found with this ID' }); // Handle case where post is not found
        }
        res.json(deletedPost); // Send a confirmation of deletion as a JSON response
    })
    .catch(err => {
        console.error(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code for server errors
    });
});

// Export the router for use in other parts of the application
module.exports = router;
