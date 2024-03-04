import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

export default function GuestNavigation({}) {
    console.log('GuestNavigation');
    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <NavLink href={route('login')} active={route().current('login')}>
                            Login
                        </NavLink>
                        <NavLink href={route('register')} active={route().current('register')}>
                            Register
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
