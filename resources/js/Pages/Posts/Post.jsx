import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Comment from "@/Components/Comment";
import CommentsList from "@/Components/CommentsList";

function Post({ post, auth }) {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-3xl text-center text-gray-800 dark:text-gray-200 leading-tight">Post</h2>} user={auth.user}>
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{post.title}</h2>
                        </header>
                        {post.image && (
                            <div className="flex justify-center mt-4">
                                <img src={`/storage/images/${post.image}`} alt="Post Image" className="max-w-full h-40 rounded-lg" />
                            </div>
                        )}
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">
                                {post.body}
                            </p>
                        </div>
                        <Comment user={auth.user} postId={post.id} />
                        <CommentsList postId={post.id} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Post;
