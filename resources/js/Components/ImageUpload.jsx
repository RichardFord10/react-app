import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ImageUploading from 'react-images-uploading';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { router } from '@inertiajs/react';

export default function ImageUpload({ entityType, imageId, uuid, entityId, type, currentImage }) {
    const [images, setImages] = React.useState([]);
    console.log('images', images);

    useEffect(() => {
        if (currentImage) {
            setImages([{
                data_url: currentImage,
                id: imageId
            }]);
        }
    }, [currentImage]);

    const onChange = async (imageList) => {
        setImages(imageList);
        const file = imageList[0]?.file;
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', type);
            formData.append('imageable_type', entityType);
            formData.append('imageable_id', entityId);
            if (uuid) {
                formData.append('uuid', uuid);
            } else {
                formData.append('image_id', imageId);
            }

            try {
                const response = await fetch('/upload-image', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': window.csrfToken,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.imagePath) {
                    setImages([{ data_url: data.imagePath, id: 'newlyFetchedId' }]);
                }
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };

    return (
        <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
            {({ onImageUpload, onImageRemove, imageList }) => (
                <div className="flex flex-wrap items-center gap-4">
                    {/* Render existing images */}
                    {imageList.map((image, index) => (
                        <div key={index} className="relative h-32 w-32"> {/* Adjust height and width as needed */}
                            <img src={image.data_url} alt="" className="rounded-lg object-cover h-full w-full" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                onClick={(event) => {
                                    event.preventDefault();
                                    onImageUpload();
                                }}>
                                <FontAwesomeIcon icon={faPencilAlt} className="text-white text-xl" />
                            </div>
                            <button type="button" onClick={() => onImageRemove(index)} className="absolute top-0 right-0 p-1 rounded-full">
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        </div>
                    ))}

                    {/* Blank upload area */}
                    <div
                        className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-900 bg-gray-100 dark:bg-gray-800"
                        onClick={(event) => {
                            event.preventDefault();
                            onImageUpload();
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-white text-2xl" />
                    </div>
                </div>
            )}
        </ImageUploading>
    );
}


