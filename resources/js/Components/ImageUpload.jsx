import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ImageUploading from 'react-images-uploading';

export default function ImageUpload({ entityType, entityId, type }) {
    const [images, setImages] = React.useState([]);

    const onChange = async (imageList) => {
        setImages(imageList);
        const file = imageList[0]?.file;
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', type);
            formData.append('imageable_type', entityType);
            formData.append('uuid', entityId);

            try {
                const response = await fetch('/upload-image', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': window.csrfToken,
                    },
                });

                console.log(formData);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    if (response.headers.get("Content-Type").includes("application/json")) {
                        const data = await response.json();
                        console.log('Upload successful', data);

                    } else {
                        const text = await response.text();
                        console.log(text);
                    }
                }
            } catch (error) {

                console.error('Upload error:', error);

            }
        }
    };

    return (
        <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
            {({ onImageUpload, onImageRemoveAll }) => (
                <div>
                    {/* Trigger the onImageUpload function directly when the label is clicked */}
                    <label htmlFor="imageUpload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline" onClick={onImageUpload}>
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload Image
                    </label>
                    <button onClick={onImageRemoveAll} className="ml-2">
                        Remove Image
                    </button>
                    {images.map((image, index) => (
                        <div key={index} className="image-item mt-2">
                            <img src={image.data_url} alt="" width="100" />
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    );
}
