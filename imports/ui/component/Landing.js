import React, { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { mainModules } from '/imports/fixture/menu';
import { useTracker } from 'meteor/react-meteor-data';
import { BellIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline';
import { useParams } from 'react-router-dom';
import NavBar from '/imports/ui/component/NavBar';
import { systemMenu } from '/imports/fixture/menu';

const Landing = () => {
    const user = useTracker(() => Meteor.user());
    const history = useHistory();
    const showModules = [];

    showModules.push(mainModules);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    const { menu } = useParams();

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2 space-y-1">
                                    {showModules.map((module, index) => (
                                        <div key={index}>
                                            {showModules[index].map((item) => {
                                                const { _id, current, name, url } = item;
                                                if (user) {
                                                    return (
                                                        <a
                                                            key={_id}
                                                            url={url}
                                                            onClick={() => history.push(url)}
                                                            className={classNames(
                                                                current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                                            )}
                                                        >
                                                            <item.icon
                                                                className={classNames(
                                                                    current
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-400 group-hover:text-gray-300',
                                                                    'mr-3 flex-shrink-0 h-6 w-6',
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            {name}
                                                        </a>
                                                    );
                                                }
                                                return undefined;
                                            })}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                            alt="Workflow"
                        />
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {showModules.map((module, index) => (
                                <div key={index}>
                                    {showModules[index].map((item) => {
                                        const { _id, current, name, url } = item;
                                        if (user) {
                                            return (
                                                <a
                                                    key={_id}
                                                    url={url}
                                                    onClick={() => history.push(url)}
                                                    className={classNames(
                                                        current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            current
                                                                ? 'text-gray-300'
                                                                : 'text-gray-400 group-hover:text-gray-300',
                                                            'mr-3 flex-shrink-0 h-6 w-6',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {name}
                                                </a>
                                            );
                                        }
                                        return undefined;
                                    })}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col">
                <NavBar menus={systemMenu} menu={menu} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1">
                    <div>
                        {(menu === 'users' && <Users />) || undefined}
                        {(menu === 'role' && <Role />) || undefined}
                        {(menu === 'button' && <Button />) || undefined}
                    </div>
                </main>
                {/* <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                Replace with your content
                <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                /End replace
              </div>
            </div>
          </main> */}
            </div>
        </div>
    );
};

export default Landing;
