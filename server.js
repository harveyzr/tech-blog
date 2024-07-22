// Import necessary modules
const express = require('express'); // Framework for building web applications
const path = require('path'); // Module for handling file and directory paths
const session = require('express-session'); // Middleware for managing sessions
const exphbs = require('express-handlebars'); // Template engine for rendering views
const routes = require('./controllers'); // Importing route controllers
const sequelize = require('./config/connection'); // Database connection configuration

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3001; // Set the port to listen on

// Set up Handlebars as the template engine with custom helpers
const hbs = exphbs.create({ helpers: require('./utils/helpers') });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); // Set the view engine to Handlebars

// Configure session settings
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionConfig = {
  secret: 'bigbluedog', // Secret for signing the session ID cookie
  cookie: {
    // Session will automatically expire in 10 minutes
    expires: 10 * 60 * 1000
  },
  resave: true, // Forces session to be saved back to the session store
  rolling: true, // Reset the cookie max age on every response
  saveUninitialized: true, // Save a new session even if it hasn't been modified
  store: new SequelizeStore({
    db: sequelize // Use Sequelize for session storage
  }),
};

// Initialize session middleware
app.use(session(sessionConfig));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server start
  });
});
