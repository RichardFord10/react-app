import React from 'react';
import { Link } from '@inertiajs/react'

class Posts extends React.Component {
    render() {
        const { posts } = this.props;
        return (
            <div>
                {posts.map(post => (
                    <div key={post.id}>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;
