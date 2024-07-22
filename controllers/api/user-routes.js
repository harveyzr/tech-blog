// Importing necessary modules
const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all users - GET /api/users
router.get('/', async (req, res) => {
    try {
        // Fetch all users excluding the password attribute
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});

// Route to get a user by ID - GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        // Find a user with associated posts and comments
        const user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id' });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});

// Route to create a new user - POST /api/users
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            twitter: req.body.twitter,
            github: req.body.github
        });

        // Initialize session variables upon user creation
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.twitter = newUser.twitter;
            req.session.github = newUser.github;
            req.session.loggedIn = true;

            return res.json(newUser);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});

// Route for user login - POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        // Confirm user existence
        if (!user) {
            return res.status(400).json({ message: 'No user with that email address!' });
        }

        // Validate password
        const isValidPassword = user.checkPassword(req.body.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        // Set session variables on successful login
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.twitter = user.twitter;
            req.session.github = user.github;
            req.session.loggedIn = true;

            return res.json({ user, message: 'You are now logged in!' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});

// Route to log out a user - POST /api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            return res.status(204).end(); // No Content
        });
    } else {
        return res.status(404).end(); // Not Found
    }
});

// Route to update a user by ID - PUT /api/users/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [updatedUser] = await User.update(req.body, {
            where: { id: req.params.id },
            individualHooks: true
        });

        // Check if the user was updated
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id' });
        }
        return res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});

// Route to delete a user by ID - DELETE /api/users/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: { id: req.params.id }
        });

        // Confirm if the user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({ message: 'No user found with this id' });
        }
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});

// Exporting the router for use in other parts of the application
module.exports = router;
