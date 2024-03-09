import React, { useEffect, useState } from 'react';

function CommentsList({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/posts/${postId}/comments`);
                if (response.ok) {
                    const data = await response.json();
                    setComments(data.comments);
                } else {
                    console.error('Failed to fetch comments:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        
        fetchComments();
    }, [postId]);

    return (
        <div>
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 dark:border-gray-600 rounded-md focus:outline-none shadow dark:text-gray-200">Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id} className="mb-4">
                        <div className="flex items-center mb-2">
                            {/* <img src={comment.user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" /> */}
                            <span className="text-gray-700">{comment.user?.name}</span>
                        </div>
                        <p className="text-gray-600">{comment.body}</p>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default CommentsList;
