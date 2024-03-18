import React, { useState } from 'react';

function Comment({ user, postId, addComment }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.trim() === '') {
            console.log('Comment cannot be empty');
            return;
        }

        try {
            const response = await fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': window.csrfToken,
                },
                body: JSON.stringify({
                    body: comment,
                    post_id: postId,
                    user_id: user.id,
                }),
            });

            if (response.ok) {
                const newComment = await response.json();
                addComment(newComment);
                setComment('');
            } else {
                console.error('Failed to submit comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };


    return (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 dark:border-gray-600 rounded-md focus:outline-none dark:text-gray-200">Leave a Comment</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-4">
                    <img src={`/storage/${user.image_path}`} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{user.name}</span>
                </div>
                <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                    rows="4"
                    placeholder="Enter your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Comment;
