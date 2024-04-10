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
import Checkbox from '@/Components/Checkbox';
import StatesDropdown from '@/Components/StatesDropdown';
import CategoryDropdown from '@/Components/CategoryDropdown';
import ImageUpdate from '@/Components/ImageUpdate';
import DeleteButton from '@/Components/DeleteButton';

const CreateStoreSettings = ({ auth, storeSettings }) => {
    const { data, setData, post, errors, processing, wasSuccessful } = useForm({
        store_name: storeSettings?.store_name || '',
        store_slug: storeSettings?.store_slug || '',
        about_us: storeSettings?.about_us || '',
        contact_email: storeSettings?.contact_email || '',
        contact_phone: storeSettings?.contact_phone || '',
        status: storeSettings?.status || 'inactive',
        social_media_links: storeSettings?.social_media_links || [],
        payment_methods: storeSettings?.payment_methods || [],
        shipping_info: storeSettings?.shipping_info || {},
        tax_settings: storeSettings?.tax_settings || {},
        seo_settings: storeSettings?.seo_settings || {},
        analytics_code: storeSettings?.analytics_code || '',
        category: storeSettings?.category || '',
        country: storeSettings?.country || '',
        state: storeSettings?.state || '',
        city: storeSettings?.city || '',
        store_logo: storeSettings?.store_logo || ''
    });

    console.log(data)

    const [showForm, setShowForm] = useState(storeSettings ? true : false);
    const [isActive, setIsActive] = useState(data.status == 'active' ? 'active' : 'inactive');
    const imageObject = {
        id: storeSettings?.id || '',
        image_path: storeSettings?.store_logo || '',
    };
    const [selectedState, setSelectedState] = useState(data.state || '');
    const [selectedCategory, setSelectedCategory] = useState(data.category || '');


    const handleStateChange = (field, value) => {
        setData(field, value);
        if (field === 'state') {
            setSelectedState(value);
        } else if (field === 'category') {
            setSelectedCategory(value);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('store-settings.store'));
    };

    if (!showForm) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PrimaryButton onClick={() => setShowForm(true)}>Create Store</PrimaryButton>
            </div>
        );
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="flex items-center justify-center">
                        {
                            storeSettings?.store_logo ?
                                <ImageUpdate image={imageObject} entityType="App\Models\Store" entityId={storeSettings.id} /> :
                                <ImageUpload entityType="App\Models\Store" type="store_logo" uuid={uuidv4()} />
                        }
                    </div>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        {/* Store Active Input */}
                        <InputLabel htmlFor="status" value="Active" />
                        <div>
                            <Checkbox
                                id="status"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                        </div>
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
                            <CategoryDropdown value={selectedCategory} onChange={(e) => handleStateChange('category', e.target.value)} error={errors.category} />
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
                        <div>
                            <InputLabel htmlFor="analytics_code" value="Analytics Code" />
                            <TextInput
                                id="analytics_code"
                                className="mt-1 block w-full"
                                value={data.analytics_code}
                                onChange={e => setData('analytics_code', e.target.value)}
                            />
                            <InputError message={errors.analytics_code} />
                        </div>
                        <div className="flex items-center gap-4">
                            <StatesDropdown value={selectedState} onChange={(e) => handleStateChange('state', e.target.value)} error={errors.category} />
                        </div>
                        <div>
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={e => setData('city', e.target.value)}
                                required
                                pattern="[A-Za-z0-9-]+"
                                title="City"
                            />
                            <InputError message={errors.store_slug} />
                        </div>
                        {/* Form Submission Button */}
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save Settings</PrimaryButton>

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
                {
                    storeSettings?.store_logo ?
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center items-center">
                            <DeleteButton to={`/store-settings/delete/${storeSettings.id}`}>Delete Store</DeleteButton>
                        </div>
                        :
                        ''
                }
            </div>
        </div>
    );
};

export default CreateStoreSettings;