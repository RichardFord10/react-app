import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Comment from "@/Components/Comment";
import CommentsList from "@/Components/CommentsList";

function Post({ post, auth }) {
    const [comments, setComments] = useState([]);
    console.log('comments', comments)
    useEffect(() => {
        fetchComments();
    }, [post.id]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/posts/${post.id}/comments`);
            if (response.ok) {
                const data = await response.json();
                setComments(data.comments);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const addComment = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-3xl text-center text-gray-800 dark:text-gray-200 leading-tight">{post.title}</h2>} user={auth.user}>
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                        </header>
                        {post.images && post.images.length > 0 && (
                            <img src={`/storage/${post.images[0].image_path}`} alt="Post Thumbnail" className="w-full h-auto rounded-lg" />
                        )}
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">
                                {post.body}
                            </p>
                        </div>
                        <Comment user={auth.user} postId={post.id} addComment={addComment} />
                        <CommentsList comments={comments} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Post;