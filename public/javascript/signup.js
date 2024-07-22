// Asynchronous function to handle the signup form submission
async function handleSignup(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve and trim user input values from the form
    const userDetails = {
        username: document.querySelector('#username-signup').value.trim(),
        email: document.querySelector('#email-signup').value.trim(),
        password: document.querySelector('#password-signup').value.trim(),
        twitter: document.querySelector('#twitter-signup').value.trim(),
        github: document.querySelector('#github-signup').value.trim()
    };

    // Check if essential fields are filled
    if (userDetails.username && userDetails.email && userDetails.password) {
        try {
            // Send a POST request to the server with user details
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails)
            });

            // Handle the server response
            if (response.ok) {
                console.log('Signup successful! Redirecting to dashboard...');
                document.location.replace('/dashboard');
            } else {
                // Alert the user if there's an error
                alert(`Error: ${response.statusText}`);
            }
        } catch (error) {
            // Log any unexpected errors
            console.error('An error occurred during signup:', error);
        }
    } else {
        // Alert the user if required fields are missing
        alert('Please fill in all required fields.');
    }
}

// Attach the event listener to the signup form
document.querySelector('.signup-form').addEventListener('submit', handleSignup);
