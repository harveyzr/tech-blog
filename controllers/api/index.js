// Import the express router
const express = require('express');
const router = express.Router();

// Import route modules for users, posts, and comments
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Mount the user routes at the '/users' path
router.use('/users', userRoutes);

// Mount the post routes at the '/posts' path
router.use('/posts', postRoutes);

// Mount the comment routes at the '/comments' path
router.use('/comments', commentRoutes);

// Export the configured router for use in the main application
module.exports = router;
