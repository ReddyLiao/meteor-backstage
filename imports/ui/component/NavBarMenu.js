import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import NavBarEnd from './NavBarEnd';

const NavBarMenu = (props) => {
    const history = useHistory();
    const menus = props.menus;
    const menu = props.menu;

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    return (
        <div className="flex-1 flex">
            {menus.map((m, index) => {
                const { _id, url, name, icon, roles, subMenu, isShow, current } = m;
                if (subMenu) {
                    return (
                        <div key={_id}>
                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">
                                    Select a tab
                                </label>
                                <select
                                    id="tabs"
                                    name="tabs"
                                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    defaultValue={subMenu.find((item) => item.current).name}
                                >
                                    {subMenu.map((item) => (
                                        <option key={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav
                                    className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                                    aria-label="Tabs"
                                >
                                    {subMenu.map((item, index) => (
                                        <a
                                            key={item.name}
                                            onClick={() => history.push(item.url)}
                                            className={classNames(
                                                item.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                                index === 0 ? 'rounded-l-lg' : '',
                                                index === subMenu.length - 1 ? 'rounded-r-lg' : '',
                                                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            <span>
                                                <i className={item.icon} />
                                                {item.name}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    item.current ? 'bg-indigo-500' : 'bg-transparent',
                                                    'absolute inset-x-0 bottom-0 h-0.5',
                                                )}
                                            />
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    );
                }
                return (
                    <nav
                        key={_id}
                        className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                        aria-label="Tabs"
                    >
                        <a
                            id={_id}
                            className={classNames(
                                current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                index === 0 ? 'rounded-l-lg' : '',
                                index === menus.length - 1 ? 'rounded-r-lg' : '',
                                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
                            )}
                            onClick={() => history.push(url)}
                        >
                            <span>
                                <i className={icon} />
                                {name}
                            </span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    current ? 'bg-indigo-500' : 'bg-transparent',
                                    'absolute inset-x-0 bottom-0 h-0.5',
                                )}
                            />
                        </a>
                    </nav>
                );
                return undefined;
            })}
        </div>
    );
};

NavBarMenu.propTypes = {
    // menus: PropTypes.array.isRequired,
    // menu: PropTypes.string.isRequired,
};

export default NavBarMenu;
