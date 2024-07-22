// Importing the necessary modules
const express = require('express');
const router = express.Router();

// Importing route modules
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Mounting the API routes under the '/api' path
router.use('/api', apiRoutes);

// Mounting the home routes at the root path
router.use('/', homeRoutes);

// Mounting the dashboard routes under the '/dashboard' path
router.use('/dashboard', dashboardRoutes);

// Handling 404 errors for any unmatched routes
router.use((req, res) => {
  res.status(404).send('404 Not Found'); // Sending a 404 response
});

// Exporting the router to be used in other parts of the application
module.exports = router;
