import React from 'react';
import { Link } from '@inertiajs/react';
import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';

class Posts extends React.Component {
    render() {
        const { posts, user_id } = this.props;
        return (
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Posts</h2>
                        </header>
                        {posts.map(post => (
                            <Link key={post.id} href={`/posts/${post.id}`}>
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center">
                                        {post.images.length > 0 && ( // Check if the post has any images
                                            <img src={`/storage/${post.images[0].image_path}`} alt="Post Thumbnail" className="w-16 h-16 rounded mr-4" />
                                        )}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                {post.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {post.body}
                                            </p>
                                        </div>
                                    </div>
                                    {post.user_id === user_id && (
                                        <div className="flex items-center">
                                            <EditButton to={`/posts/edit/${post.id}`} className="mr-2">Edit</EditButton>
                                            <DeleteButton to={`/posts/${post.id}`}>Delete</DeleteButton>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Posts;
