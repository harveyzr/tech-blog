// Import necessary modules
const express = require('express');
const router = express.Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Middleware to log session information
const logSession = (req, res, next) => {
    console.log(req.session);
    next();
};

// Apply middleware to log session
router.use(logSession);

// Route to get all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'twitter', 'github']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            ]
        });

        // Serialize the data for rendering
        const posts = postsData.map(post => post.get({ plain: true }));

        // Render the homepage with posts
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('signup');
});

// Route to get a single post by ID
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'created_at', 'post_content'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'twitter', 'github']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            ]
        });

        // Check if the post exists
        if (!postData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        // Serialize the post data
        const post = postData.get({ plain: true });

        // Render the single post page
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Export the router for use in the main application
module.exports = router;
