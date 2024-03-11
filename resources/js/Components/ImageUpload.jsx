import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ImageUploading from 'react-images-uploading';
import { router } from '@inertiajs/react';

export default function NewImageUpload({ entityType, entityId, type, uuid }) {
    const onUpload = async (imageList) => {
        const file = imageList[0]?.file;
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', type);
            formData.append('imageable_type', entityType);
            formData.append('imageable_id', entityId);

            if (uuid) {
                formData.append('uuid', uuid);
            }

            try {
                await router.post(route('image.store'), formData, {
                    preserveScroll: true,
                    forceFormData: true,
                });
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };

    return (
        <ImageUploading multiple={false} value={[]} onChange={onUpload} dataURLKey="data_url">
            {({ onImageUpload }) => (
                <div className="h-32 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900"
                    onClick={onImageUpload}>
                    <FontAwesomeIcon icon={faPlus} className="text-white text-2xl" />
                </div>
            )}
        </ImageUploading>
    );
}
