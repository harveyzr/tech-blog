// Exporting an object containing utility functions for formatting
module.exports = {
    // Function to format a date into MM/DD/YYYY format
    format_date: (inputDate) => {
        const dateInstance = new Date(inputDate); // Create a new date object
        // Return the formatted date string
        return `${dateInstance.getMonth() + 1}/${dateInstance.getDate()}/${dateInstance.getFullYear()}`;
    },

    // Function to return a pluralized word based on the provided count
    format_plural: (term, count) => {
        // Check if the count is not equal to 1 to determine pluralization
        return count !== 1 ? `${term}s` : term; // Return the plural or singular form
    }
};
