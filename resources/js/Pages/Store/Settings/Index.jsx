import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Create from '@/Pages/Store/Settings/Create';
import { Head } from '@inertiajs/react';
import Edit from '@/Pages/Store/Settings/Edit';

export default function Index({ auth, storeSettings }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Store Settings</h2>}
        >
            <div>
                {
                    storeSettings ?
                        <Edit storeSettings={storeSettings} /> :
                        <Create auth={auth} />
                }
            </div>
        </AuthenticatedLayout>
    );
}