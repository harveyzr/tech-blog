// Import necessary modules
const express = require('express');
const router = express.Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts for the logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch posts associated with the current user
        const postsData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username', 'twitter', 'github'] }
                },
                { model: User, attributes: ['username', 'twitter', 'github'] }
            ]
        });

        // Serialize the data for rendering
        const posts = postsData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Route to edit a specific post by ID
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // Find the post by ID
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username', 'twitter', 'github'] }
                },
                { model: User, attributes: ['username', 'twitter', 'github'] }
            ]
        });

        // Check if the post exists
        if (!postData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        // Serialize the post data
        const post = postData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Route to create a new post
router.get('/create/', withAuth, async (req, res) => {
    try {
        // Fetch posts for the logged-in user
        const postsData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username', 'twitter', 'github'] }
                },
                { model: User, attributes: ['username', 'twitter', 'github'] }
            ]
        });

        // Serialize the posts for rendering
        const posts = postsData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Export the router for use in other parts of the application
module.exports = router;
