import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default function ImageUpload({ onFileSelect }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileSelect(file);
    };

    return (
        <div>
            <input
                type="file"
                id="imageUpload"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="imageUpload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Upload Image
            </label>
        </div>
    );
}
