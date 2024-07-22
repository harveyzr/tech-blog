// Function to handle user logout
async function handleLogout() {
    // Send a POST request to the logout endpoint
    const response = await fetch('/api/users/logout', {
        method: 'POST', // Specify the request method
        headers: { 'Content-Type': 'application/json' } // Set the content type
    });

    // Check if the response is successful
    if (response.ok) {
        // Redirect to the homepage upon successful logout
        document.location.assign('/'); // Using assign for clarity
    } else {
        // Alert the user if there was an error during logout
        alert('Logout failed: ' + response.statusText);
    }
}

// Attach the logout handler to the logout button
document.querySelector('#logout').addEventListener('click', handleLogout);
