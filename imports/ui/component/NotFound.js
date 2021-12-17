import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <div className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
                <div className="text-center">
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        404 Page Not Found
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                        An unexpected error has occurred. Please contact the site owner.
                    </p>
                    <div className="mt-6">
                        <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                            Go back home<span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0 flex justify-center">
                <img src="/images/404-robot.gif" alt="Page Not Found." />
            </div>
        </div>
    </div>
);

export default NotFound;
