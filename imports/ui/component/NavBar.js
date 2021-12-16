import React from 'react';
import PropTypes from 'prop-types';
import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import NavBarMenu from './NavBarMenu';
import NavBarEnd from './NavBarEnd';

const NavBar = (props) => (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        {/* <NavBarBrand /> */}
        <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => props.setSidebarOpen(true)}
        >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
                <NavBarMenu menus={props.menus} menu={props.menu} />
            </div>
            <div className="ml-4 flex items-center md:ml-6">
                <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <NavBarEnd />
            </div>
        </div>
    </div>
);

NavBar.propTypes = {
    menus: PropTypes.array.isRequired,
    menu: PropTypes.string.isRequired,
};

export default NavBar;
