import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Posts from '@/Pages/Posts/All';
import Orders from '@/Pages/Orders/All';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-5 flex justify-center text-gray-900 text-xl dark:text-gray-100">Hello {auth.user.name}!</div>
                        <Posts posts={auth.posts} user_id={auth.user.id} />
                    </div>
                </div>
                <br></br>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <Orders orders={auth.orders} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
