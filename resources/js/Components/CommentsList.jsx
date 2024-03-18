import React from 'react';

function CommentsList({ comments = [] }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 dark:border-gray-600 rounded-md focus:outline-none shadow dark:text-gray-200">Comments</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id} className="mb-3 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                            <div className="mb-4">
                                <p className="text-gray-800 dark:text-gray-300">{comment.body}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>{formatDate(comment.created_at)}</span>
                                <span>{comment.user?.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CommentsList;
