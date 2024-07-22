// Import the User model from the models directory
const { User } = require('../models');

// Define an array of user objects with their details
const users = [
    {
        username: "martin_bour",
        twitter: "martinb",
        github: "martinb",
        email: "martin_b@gmail.com",
        password: "p@ssword1"
    },
    {
        username: "matt_b",
        twitter: "mathewb",
        github: "mathewb",
        email: "mathew_b@gmail.com",
        password: "p@ssword2"
    },
    {
        username: "shaun_c",
        twitter: "shaun",
        github: "shaun",
        email: "shaun_c@gmail.com",
        password: "p@ssword3"
    },
    {
        username: "lee_n",
        twitter: "leenorris",
        github: "leenorris",
        email: "lee_n@gmail.com",
        password: "p@ssword4"
    },
    {
        username: "priya_r",
        twitter: "priyaravi23",
        github: "priyaravi23",
        email: "priya_r@gmail.com",
        password: "p@ssword5"
    },
    {
        username: "pooja",
        twitter: "pooja_w",
        github: "pooja",
        email: "pooja@gmail.com",
        password: "p@ssword6"
    }
];

// Function to seed users into the database
const populateUsers = () => {
    return User.bulkCreate(users); // Use bulkCreate to insert multiple users at once
};

// Export the populateUsers function for use in other modules
module.exports = populateUsers;
