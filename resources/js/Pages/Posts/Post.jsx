import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Post({ post, auth }) {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Post</h2>} user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{post.title}</h2>
                        </header>
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {post.body}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Post;
