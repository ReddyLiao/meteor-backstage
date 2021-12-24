import { Accounts } from 'meteor/accounts-base';
import React, { useState, useContext, Fragment, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RoutingContext } from '/imports/ui/route';
import { Menu, Dialog, Transition } from '@headlessui/react';

const NavBarEnd = () => {
    const history = useHistory();
    const user = useContext(RoutingContext)?.user || {};
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        error: '',
    });
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    function logout() {
        Accounts.logout();
        history.push('/login');
    }

    function showPasswordModal() {
        setOpen(true);
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    function handleSave() {
        if (password.oldPassword !== '' && password.newPassword !== '') {
            Accounts.changePassword(password.oldPassword, password.newPassword, (error) => {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: '錯誤',
                        text: error.reason,
                    }).then();
                    setPassword(password);
                } else {
                    password.error = '';
                    Swal.fire({
                        icon: 'success',
                        title: '成功',
                        text: '密碼已更新',
                    }).then();
                    setOpen(false);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '請輸入舊密碼及新密碼.',
            }).then((r) => {});
            setPassword(password);
        }
    }

    function handleClose() {
        setOpen(false);
    }

    const handleChange = (e) => {
        const { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            password[name] = checked;
        } else {
            password[name] = value;
        }
        setPassword(password);
    };

    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="">{user?.profile?.name || ''}</div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onClick={showPasswordModal}
                >
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                )}
                            >
                                <span className="icon is-medium">
                                    <i className="fa fa-passport" />
                                </span>
                                更改密碼
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item onClick={logout}>
                        {({ active }) => (
                            <a
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                )}
                            >
                                <span className="icon is-medium">
                                    <i className="fa fa-passport" />
                                </span>
                                登出
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">更改密碼</h3>
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        帳號
                                                    </label>
                                                    <input
                                                        className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        type="text"
                                                        name="username"
                                                        readOnly={true}
                                                        autoComplete="off"
                                                        value={user?.username || ''}
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        舊密碼
                                                    </label>
                                                    <input
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        type="password"
                                                        name="oldPassword"
                                                        placeholder="********"
                                                        autoComplete="on"
                                                        required
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        新密碼
                                                    </label>
                                                    <input
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        type="password"
                                                        name="newPassword"
                                                        autoComplete="on"
                                                        placeholder="********"
                                                        required
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        className="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => handleSave()}
                                    >
                                        確認
                                    </button>
                                    <button
                                        className="bg-white mx-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleClose}
                                    >
                                        取消
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </Menu>
    );
};

export default NavBarEnd;
