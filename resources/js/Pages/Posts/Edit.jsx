import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import EditForm from '@/Components/Posts/EditForm';

export default function Edit({ auth, post }) {
  return (
    <div>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Post</h2>}
      >
        <Head title="Edit Post" />
        <EditForm post={post} />
      </AuthenticatedLayout>
    </div>
  );
}
