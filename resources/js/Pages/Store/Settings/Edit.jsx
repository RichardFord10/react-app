import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import ImageUpdate from '@/Components/ImageUpdate';
import ImageUpload from '@/Components/ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';

export default function Edit({ storeSettings }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        store_name: storeSettings.store_name || '',
        about_us: storeSettings.about_us || '',
        contact_email: storeSettings.contact_email || '',
        contact_phone: storeSettings.contact_phone || '',
        active: storeSettings.active || false,
        store_slug: storeSettings.store_slug || '',
    });

    const imageObject = {
        id: storeSettings.id,
        image_path: storeSettings.store_logo,
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('store-settings.store'));
    };

    const [isActive, setIsActive] = useState(storeSettings.active || false);
    console.log("Edit", storeSettings)
    return (
        <div className="py-12" >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="flex justify-center py-2">
                        <div className="rounded-full">
                            {
                                storeSettings.store_logo ?
                                    <ImageUpdate image={imageObject} entityType="App\Models\StoreSetting" entityId={storeSettings.id} /> :
                                    <ImageUpload entityType="App\Models\StoreSettings" type="store_logo" uuid={uuidv4()} entityId={storeSettings.id} />
                            }
                        </div>
                    </div>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        {/* Store Active Input */}
                        <InputLabel htmlFor="active" value="Active" />
                        <div>
                            <Checkbox
                                id="active"
                                checked={isActive}
                                onChange={(e) => { setIsActive(e.target.checked); setData('active', e.target.checked) }}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="store_name" value="Store Name" />
                            <TextInput
                                id="store_name"
                                className="mt-1 block w-full"
                                value={data.store_name}
                                onChange={(e) => setData('store_name', e.target.value)}
                                required
                                autoComplete="store-name"
                            />

                            <InputError className="mt-2" message={errors.store_name} />
                        </div>
                        {/* Store Slug Input */}
                        <div>
                            <InputLabel htmlFor="store_slug" value="Store URL Slug (Your store will be available at /slug-value, use dashes to seperate words)" />
                            <TextInput
                                id="store_slug"
                                className="mt-1 block w-full"
                                value={data.store_slug}
                                onChange={e => setData('store_slug', e.target.value)}
                                required
                                pattern="[A-Za-z0-9-]+" // Simple pattern to allow only letters, numbers, and hyphens
                                title="Slug can only contain letters, numbers, and hyphens."
                            />
                            <InputError message={errors.store_slug} />
                        </div>
                        <div>
                            <InputLabel htmlFor="about_us" value="About Us" />

                            <TextArea
                                id="about_us"
                                className="mt-1 block w-full"
                                value={data.about_us}
                                onChange={(e) => setData('about_us', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.about_us} />
                        </div>

                        <div>
                            <InputLabel htmlFor="contact_email" value="Contact Email" />

                            <TextInput
                                id="contact_email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.contact_email}
                                onChange={(e) => setData('contact_email', e.target.value)}
                                required
                                autoComplete="email"
                            />

                            <InputError className="mt-2" message={errors.contact_email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="contact_phone" value="Contact Phone" />

                            <TextInput
                                id="contact_phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.contact_phone}
                                onChange={(e) => setData('contact_phone', e.target.value)}
                                autoComplete="tel"
                            />

                            <InputError className="mt-2" message={errors.contact_phone} />
                        </div>

                        {/* Add more fields as necessary for social_media_links, payment_methods, shipping_info, tax_settings, seo_settings, analytics_code */}

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save Store Settings</PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
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
            </div >
        </div >
    );
}
