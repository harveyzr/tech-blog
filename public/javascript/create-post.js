// Function to handle the submission of the new post form
async function handleNewPostSubmission(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the values from the input fields
    const postTitle = document.querySelector('input[name="post-title"]').value.trim();
    const postContent = document.querySelector('input[name="post-content"]').value.trim();

    // Check if both title and content are provided
    if (postTitle && postContent) {
        // Send a POST request to create a new post
        const serverResponse = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle,
                post_content: postContent
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check the response from the server
        if (serverResponse.ok) {
            // If successful, redirect to the dashboard
            document.location.replace('/dashboard');
        } else {
            // Alert the user if there was an error with the request
            alert(`Error: ${serverResponse.statusText}`);
        }
    } else {
        // Alert the user if fields are empty
        alert('Please fill in both title and content.');
    }
}

// Add an event listener to the form for submission
document.querySelector('.new-post-form').addEventListener('submit', handleNewPostSubmission);
