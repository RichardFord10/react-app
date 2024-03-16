import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Posts from '@/Pages/Posts/All';
import Orders from '@/Pages/Orders/All';

export default function Dashboard({ auth }) {
    const [showPosts, setShowPosts] = useState(false);
    const [showOrders, setShowOrders] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowPosts(!showPosts)}
                    >
                        {showPosts ? 'Hide Posts' : 'Show Posts'}
                    </button>

                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowOrders(!showOrders)}
                    >
                        {showOrders ? 'Hide Orders' : 'Show Orders'}
                    </button>
                </div>

                {showPosts && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <Posts posts={auth.posts} user_id={auth.user.id} />
                        </div>
                    </div>
                )}

                {showOrders && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <Orders orders={auth.orders} />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
