import {router} from '@inertiajs/react';

export default function DeleteButton({ to, className = '', disabled, children, ...props }) {
    const handleClick = (e) => {
        e.preventDefault();
        if (to && confirm('Are you sure you want to delete this post?')) {
          router.delete(to);
        }
    };

    return (
        <button onClick={handleClick}
            {...props}
            className={`inline-flex px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'} ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
