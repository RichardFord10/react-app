import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Index({ auth, store }) {
    // Check if there's an authenticated user
    const isAuthenticated = auth.user;
    console.log(store)
    // Conditional rendering based on authentication status
    if (isAuthenticated) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{store.store_name}</h2>}
            >
                <div>
                    {/* Content for authenticated users */}
                </div>
            </AuthenticatedLayout>
        );
    } else {
        return (
            <GuestLayout>
                {/* Content for guests */}
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{store.store_name}</h2>
                {/* You might want to include additional content for guests here */}
            </GuestLayout>
        );
    }
}