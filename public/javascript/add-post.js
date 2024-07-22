// Function to handle the submission of the new post form
async function handleNewPostForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve values from the input fields
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postContent = document.querySelector('input[name="post-content"]').value;

    // Prepare the data to be sent in the POST request
    const postData = {
        title: postTitle,
        post_content: postContent
    };

    try {
        // Send a POST request to create a new post
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard if successful
            document.location.replace('/dashboard');
        } else {
            // Alert the user if there was an error
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Failed to create post:', error);
        alert('An error occurred while creating the post. Please try again.');
    }
}

// Attach the event listener to the form for submission
document.querySelector('.new-post-form').addEventListener('submit', handleNewPostForm);
