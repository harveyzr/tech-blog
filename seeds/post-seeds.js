// Import the Post model from the models directory
const { Post } = require('../models');

// Define an array of post data with relevant details
const posts = [
    {
        title: "Taskmaster goes public!",
        content: "Taskinator is a task-tracker app that will allow you to organize your personal to-do list items by clicking and dragging them into categories like To Do, In Progress, and Completed.",
        authorId: 3
    },
    {
        title: "Zoo Keepr reaches 1 million subscribers!",
        content: "The local zoo has received funding to build a new online catalog, and they've asked to create a web server for a front-end application they’re developing, called Zoo Keepr. This site’s data will be stored on the server, allowing animal enthusiasts to access it from various locations and browsers without needing to download it.",
        authorId: 1
    },
    {
        title: "Work Day Scheduler tool now available!",
        content: "A simple calendar application that allows users to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery, utilizing the Moment.js library for date and time management.",
        authorId: 2
    },
    {
        title: "Tech Blog has been released!",
        content: "A CMS-style blog site similar to WordPress, where developers can publish their blog posts and comment on others. This site will be built from scratch and deployed to Heroku, following the MVC paradigm with Handlebars.js as the templating language and Sequelize as the ORM.",
        authorId: 5
    },
    {
        title: "Just Tech News goes public!",
        content: "Just Tech News—a tech news website where users can post, upvote, and comment on links to news articles. This application will use Sequelize for MySQL queries, implement password hashing for secure user accounts, and connect to JawsDB, a MySQL add-on for Heroku.",
        authorId: 4
    }
];

// Function to seed posts into the database
const initializePosts = () => Post.bulkCreate(posts);

// Export the function for use in other modules
module.exports = initializePosts;
