import React, { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import ImageUpload from '@/Components/ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { Link, useForm, usePage } from '@inertiajs/react';
import EditButton from '@/Components/EditButton';


const CreateStoreSettings = ({ auth }) => {
    const { data, setData, post, errors, processing, wasSuccessful } = useForm({
        store_name: '',
        about_us: '',
        contact_email: '',
        contact_phone: '',
    });

    const submit = (e) => {
        EditButton
        e.preventDefault();
        post(route('store-settings.store'));
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="flex items-center justify-center">
                        <ImageUpload entityType="App\Models\StoreSettings" type="store_logo" uuid={uuidv4()} entityId={auth.user.id} showPreview={true} />
                    </div>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        {/* Store Name Input */}
                        <div>
                            <InputLabel htmlFor="store_name" value="Store Name" />
                            <TextInput
                                id="store_name"
                                className="mt-1 block w-full"
                                value={data.store_name}
                                onChange={e => setData('store_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.store_name} />
                        </div>

                        {/* About Us Input */}
                        <div>
                            <InputLabel htmlFor="about_us" value="About Us" />
                            <TextArea
                                id="about_us"
                                className="mt-1 block w-full"
                                value={data.about_us}
                                onChange={e => setData('about_us', e.target.value)}
                            />
                            <InputError message={errors.about_us} />
                        </div>

                        {/* Contact Email Input */}
                        <div>
                            <InputLabel htmlFor="contact_email" value="Contact Email" />
                            <TextInput
                                id="contact_email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.contact_email}
                                onChange={e => setData('contact_email', e.target.value)}
                                required
                            />
                            <InputError message={errors.contact_email} />
                        </div>

                        {/* Contact Phone Input */}
                        <div>
                            <InputLabel htmlFor="contact_phone" value="Contact Phone" />
                            <TextInput
                                id="contact_phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.contact_phone}
                                onChange={e => setData('contact_phone', e.target.value)}
                            />
                            <InputError message={errors.contact_phone} />
                        </div>

                        {/* Form Submission Button */}
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Create Store Settings</PrimaryButton>

                            {/* Success Message */}
                            <Transition
                                show={wasSuccessful}
                                enter="transition ease-in-out duration-150"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in-out duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Settings Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStoreSettings;