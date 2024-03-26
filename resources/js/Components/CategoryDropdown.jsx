import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function CategoryDropdown({ value, onChange, error }) {
    return (
        <div>
            <InputLabel htmlFor="category" value="Category" />
            <select
                id="category"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                value={value} // Use passed prop
                onChange={onChange} // Use passed prop
                required
            >
                <option value="">Select a category</option> {/* Default option */}
                <option value="fashion_apparel">Fashion & Apparel</option>
                <option value="health_beauty">Health & Beauty</option>
                <option value="electronics_tech">Electronics & Tech</option>
                {/* Add more options here following the pattern */}
            </select>
            <InputError message={error} />
        </div>
    );
}
