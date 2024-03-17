import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function ImageUpdate({ image }) {
    const { post, processing, reset } = useForm({
        image: null,
    });
    const updateImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('_method', 'put');

            router.post(route('image.update', image.id), formData, {
                preserveScroll: true,
                onSuccess: () => reset(),
                forceFormData: true,
            });
        }
    };

    const deleteImage = () => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            router.post(route('image.delete', image.id), {
                _method: 'delete',
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="relative h-32 w-32">
            <img src={`/storage/${image.image_path}`} alt="" className="rounded-lg object-cover h-full w-full" />
            <label htmlFor="image-update" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <FontAwesomeIcon icon={faPencilAlt} className="text-white text-xl" />
                <input id="image-update" type="file" onChange={updateImage} style={{ display: 'none' }} disabled={processing} />
            </label>
            <button onClick={deleteImage} type="button" className="absolute top-0 right-0 p-1 rounded-full" disabled={processing}>
                <FontAwesomeIcon icon={faTimesCircle} />
            </button>
        </div>
    );
}
