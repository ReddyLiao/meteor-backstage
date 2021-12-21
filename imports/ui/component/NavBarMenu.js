import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import _ from 'lodash';

const NavBarMenu = (props) => {
    const history = useHistory();
    const menus = props.menus;
    const menu = props.menu;

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    function handleUrlChange(e) {
        history.push(e.target.value);
    }

    return (
        <div className="w-full flex md:ml-0 mt-2">
            <div className="w-full">
                <div className="sm:hidden">
                    <select
                        id="tabs"
                        name="tabs"
                        onChange={handleUrlChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {menus.map((item) => (
                            <option key={item._id} value={item.url}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block ">
                    <div className="border-b border-gray-200 block w-full">
                        <div className="-mb-px flex" aria-label="Tabs">
                            {menus.map((item) => (
                                <a
                                    key={item._id}
                                    onClick={() => history.push(item.url)}
                                    className={classNames(
                                        item.current
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                        'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

NavBarMenu.propTypes = {
    // menus: PropTypes.array.isRequired,
    // menu: PropTypes.string.isRequired,
};

export default NavBarMenu;
