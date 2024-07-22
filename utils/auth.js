// Middleware to ensure user authentication
const ensureAuthenticated = (req, res, next) => {
    // Check if user_id exists in the session
    if (!req.session.user_id) {
        // If not authenticated, redirect to the login page
        return res.redirect('/login');
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
};

// Export the authentication middleware for use in other parts of the application
module.exports = ensureAuthenticated;
