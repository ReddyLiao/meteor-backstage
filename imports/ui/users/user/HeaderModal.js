import React, { Fragment, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Swal from 'sweetalert2';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Random } from 'meteor/random';

import Role from '/imports/api/role/collection';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import { buttonOptions } from '/imports/fixture/button';

import { Dialog, Transition } from '@headlessui/react';

const INITIAL_STATE = {
    username: '',
    name: '',
    email: '',
    address: '',
    password: '',
    phone: '',
    roles: [],
    grantedMenus: [],
    grantedButtons: [],
    addRole: '',
    addGrantedButton: '',
    error: '',
};

const Modal = (props) => {
    const { handleChange, handleAdd, handleRemove, clearValues, values } = HandleFieldChange(INITIAL_STATE);
    const cancelButtonRef = useRef(null);

    let roleOptions = [];
    useTracker(() => {
        roleOptions = Role.find({}, { fields: { _id: 1, name: 1 } })
            .fetch()
            .map((item) => ({ value: item._id, label: item.name }));
    });

    function handleClose() {
        clearValues();
        Session.set('grantedMenuIDs', []);
        Session.set('expandedMenuIDs', []);
        props.setOpen(false);
    }

    function handleSave() {
        values.grantedMenuIDs = Session.get('grantedMenuIDs');
        if (values.name !== '' && values.username !== '' && values.password !== '' && values?.roles.length > 0) {
            Meteor.call('users.insert', values, (error) => {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.reason,
                        showClass: {
                            popup: 'animated fadeInDown faster',
                        },
                        hideClass: {
                            popup: 'animated fadeOutUp faster',
                        },
                    }).then();
                } else {
                    handleClose();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '請輸入帳號/姓名/密碼/角色/等資料',
                showClass: {
                    popup: 'animated fadeInDown faster',
                },
                hideClass: {
                    popup: 'animated fadeOutUp faster',
                },
            }).then();
        }
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={props.setOpen}
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">新的帳號</h3>

                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    帳號 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="username"
                                                    placeholder="請輸入登入帳號"
                                                    required
                                                    value={values.username}
                                                    onChange={handleChange}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-address-card" />
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    姓名 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="name"
                                                    placeholder="請輸入姓名"
                                                    required
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-address-card" />
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label
                                                    htmlFor="email-address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    EMail
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="email"
                                                    placeholder="請輸入EMail"
                                                    required
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-mailbox" />
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label
                                                    htmlFor="address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    居住地址
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="address"
                                                    placeholder="請輸入居住地址"
                                                    required
                                                    value={values.address}
                                                    onChange={handleChange}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-mailbox" />
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    密碼 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="password"
                                                    placeholder="請輸入密碼"
                                                    required
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-passport" />
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">手機 </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="phone"
                                                    placeholder="請輸入手機號碼"
                                                    required
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    角色 *
                                                </label>
                                                <div>
                                                    <div>
                                                        <select
                                                            id="idNewUsersRoles"
                                                            name="addRole"
                                                            value={values.addRole}
                                                            onChange={handleChange}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="">請選擇</option>
                                                            {roleOptions.map((c) => (
                                                                <option key={c.value} value={c.value}>
                                                                    {c.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            className="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none  transition text-blue-600 bg-blue-50 hover:text-blue-800 hover:bg-blue-100 "
                                                            onClick={() => handleAdd('addRole', 'roles')}
                                                        >
                                                            增加
                                                        </button>
                                                    </div>
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <tbody id="tbodyNewUsersRoles">
                                                            {values.roles &&
                                                                values.roles.map((role, i) => (
                                                                    <tr key={Random.id()}>
                                                                        <td>{role}</td>
                                                                        <td>
                                                                            <button
                                                                                className="px-4 py-2 rounded-md text-sm font-medium focus:outline-none  transition text-red-600 hover:bg-red-50 active:bg-red-100 "
                                                                                onClick={() => handleRemove('roles', i)}
                                                                            >
                                                                                刪除
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    授權按鈕
                                                </label>
                                                <div>
                                                    <div>
                                                        <select
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            id="idNewUsersGrantedButtons"
                                                            name="addGrantedButton"
                                                            value={values.addGrantedButton}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">請選擇</option>
                                                            <option value="all">全部</option>
                                                            {buttonOptions.map((c) => (
                                                                <option key={c.value} value={c.value}>
                                                                    {c.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            className="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none  transition text-blue-600 bg-blue-50 hover:text-blue-800 hover:bg-blue-100 "
                                                            onClick={() =>
                                                                handleAdd('addGrantedButton', 'grantedButtons')
                                                            }
                                                        >
                                                            增加
                                                        </button>
                                                    </div>
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <tbody id="tbodyNewUsersGrantedButtons">
                                                            {values.grantedButtons &&
                                                                values.grantedButtons.map((button, i) => (
                                                                    <tr key={Random.id()}>
                                                                        <td>
                                                                            {button === 'all'
                                                                                ? 'all'
                                                                                : _.find(buttonOptions, [
                                                                                      'value',
                                                                                      button,
                                                                                  ]).label}
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                className="px-4 py-2 rounded-md text-sm font-medium focus:outline-none  transition text-red-600 hover:bg-red-50 active:bg-red-100 "
                                                                                onClick={() =>
                                                                                    handleRemove('grantedButtons', i)
                                                                                }
                                                                            >
                                                                                刪除
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {values.error ? (
                                <div className="mb-2 text-center sm:mt-5">
                                    <p className="mx-4 mb-2 px-4 py-3 bg-yellow-50 border-none rounded-md text-lg leading-4 text-gray-500">
                                        錯誤！
                                        <span>{values.error}</span>
                                    </p>
                                </div>
                            ) : undefined}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    className="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleSave()}
                                >
                                    存檔
                                </button>
                                <button
                                    className="bg-white mx-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleClose()}
                                >
                                    離開
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.propTypes = {};

export default Modal;
