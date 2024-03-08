import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImageUpload from '@/Components/ImageUpload';

export default function CreateForm() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('body', data.body);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
    
        try {
            const response = await fetch('/posts', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': window.csrfToken
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Convert the response to JSON
            const responseData = await response.json();
    
            if (responseData && responseData.page) {
                window.location = responseData.page;
            } else {
                //success
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create a new Post</h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Say something interesting!
                        </p>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="body" value="Body" />
                            <TextInput
                                id="body"
                                type="text"
                                name="body"
                                value={data.body}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('body', e.target.value)}
                            />
                            <InputError message={errors.body} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <ImageUpload onFileSelect={setSelectedFile} />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Confirm
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
