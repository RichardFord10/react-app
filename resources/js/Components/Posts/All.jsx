import React from 'react';
import { Link } from '@inertiajs/react'

class Posts extends React.Component {
    render() {
        const { posts } = this.props;
        return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Posts Feed</h2>
                        </header>
                        {posts.map(post => (
                            <div key={post.id} className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    <Link href={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {post.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default Posts;
