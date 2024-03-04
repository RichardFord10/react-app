import React from 'react';
import CreateForm from '@/Components/Posts/CreateForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
export default function Create({ auth }) {
  return (
    <div>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Post</h2>}
      >
        <Head title="Dashboard" />
        <CreateForm />
      </AuthenticatedLayout>
    </div>
  );
}
