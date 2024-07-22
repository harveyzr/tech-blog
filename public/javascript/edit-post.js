// Function to handle the submission of the edit form
async function handleEditFormSubmission(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the title and content from the form inputs
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postContent = document.querySelector('input[name="post-content"]').value;

    // Extract the post ID from the current URL
    const postId = window.location.pathname.split('/').pop();

    // Prepare the data to be sent in the request
    const requestData = {
        title: postTitle,
        post_content: postContent
    };

    try {
        // Send the PUT request to update the post
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Indicate the content type
            },
            body: JSON.stringify(requestData) // Convert the data to JSON
        });

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
            // Redirect to the dashboard upon success
            window.location.replace('/dashboard/');
        } else {
            // Alert the user with the error message
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        // Handle any network or unexpected errors
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred while trying to edit the post. Please try again.');
    }
}

// Attach the event listener to the edit post form
document.querySelector('.edit-post-form').addEventListener('submit', handleEditFormSubmission);
