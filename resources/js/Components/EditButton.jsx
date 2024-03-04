import {router} from '@inertiajs/react';

export default function EditButton({ to, className = '', children, ...props }) {
    const handleClick = (e) => {
        e.preventDefault();
        if (to) {
            router.visit(to);
        }
    };

    return (
        <button onClick={handleClick}
                {...props}
                className={`inline-flex px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}>
            {children}
        </button>
    );
}