import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImageUpload from '../ImageUpload';

export default function EditForm({ post }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: post.title,
        body: post.body,
        id: post.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(`/posts/update/${data.id}`);
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="flex justify-start text-lg font-medium text-gray-900 dark:text-gray-100">Edit Post</h2> {/* Updated text */}

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Update your post with new insights.
                        </p>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Update
                            </PrimaryButton>
                        </div>
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
                    </form>
                    <div className="mt-4 grid grid-cols-3 gap-4">

                        {post.images && post.images.map((image, index) => (
                            <div key={index}>
                                <ImageUpload
                                    entityType="App\Models\Post"
                                    entityId={post.id}
                                    currentImage={"/storage/" + image.image_path}
                                    imageId={image.id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
