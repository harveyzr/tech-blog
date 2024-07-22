// Async function to handle comment submission
async function handleCommentSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the trimmed comment text from the textarea
    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Extract the post ID from the current URL
    const currentURL = window.location.toString();
    const postId = currentURL.split('/').pop(); // Get the last segment of the URL as post ID

    // Proceed only if the comment text is not empty
    if (commentText) {
        // Send a POST request to the API to add a new comment
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify({
                post_id: postId, // Include post ID in the request body
                comment_text: commentText // Include comment text in the request body
            }),
        });

        // Check if the response is OK and reload the page if successful
        if (response.ok) {
            document.location.reload(); // Reload the page to see the new comment
        } else {
            alert(response.statusText); // Alert the user if something went wrong
        }
    }
}

// Add event listener to the comment form for submission
document.querySelector('.comment-form').addEventListener('submit', handleCommentSubmission);
