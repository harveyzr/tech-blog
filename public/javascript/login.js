// Asynchronous function to handle the login form submission
async function handleLoginForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve and trim the email and password input values
    const emailInput = document.querySelector('#email-login');
    const passwordInput = document.querySelector('#password-login');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if both email and password fields are filled
    if (email && password) {
        // Prepare the request to log in the user
        const loginResponse = await fetch('/api/users/login', {
            method: 'POST', // Use POST method for login
            body: JSON.stringify({ email, password }), // Send email and password as JSON
            headers: { 'Content-Type': 'application/json' } // Set content type to JSON
        });

        // Handle the response from the server
        if (loginResponse.ok) {
            // Redirect to the dashboard if login is successful
            document.location.replace('/dashboard');
        } else {
            // Alert the user if there was an error during login
            alert(loginResponse.statusText);
        }
    } else {
        // Alert the user if email or password is missing
        alert('Please enter both email and password.');
    }
}

// Attach the event listener to the login form
document.querySelector('.login-form').addEventListener('submit', handleLoginForm);
