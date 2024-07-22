// Asynchronous function to handle the deletion of a post
async function handleDeletePost(event) {
    // Prevent the default action of the event (e.g., form submission)
    event.preventDefault();
    
    // Extract the post ID from the current URL
    const currentUrl = window.location.toString();
    const postId = currentUrl.split('/').pop(); // Get the last segment of the URL

    // Send a DELETE request to the API with the post ID
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE', // Specify the HTTP method
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        }
    });
    
    // Check if the response is successful
    if (response.ok) {
        // Redirect to the dashboard if the deletion was successful
        document.location.replace('/dashboard/');
    } else {
        // Alert the user if there was an error with the request
        alert(`Error: ${response.statusText}`);
    }
}

// Attach the delete handler to the delete button
document.querySelector('.delete-post-btn').addEventListener('click', handleDeletePost);
