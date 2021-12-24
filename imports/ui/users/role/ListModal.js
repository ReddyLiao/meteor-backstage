import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { Session } from 'meteor/session';

import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import MenuTree from '/imports/ui/component/MenuTree';
import { Dialog, Transition } from '@headlessui/react';

const INITIAL_STATE = {
    name: '',
    cname: '',
    description: '',
    error: '',
};

const ListModal = (props) => {
    const { handleChange, handleFocus, resetValues, values } = HandleFieldChange(INITIAL_STATE);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        if (props?.editItem?._id) {
            const newValues = {
                name: props.editItem.name,
                cname: props.editItem.cname,
                description: props.editItem.description || '',
                grantedMenuIDs: props?.editItem?.profile?.grantedMenuIDs,
            };
            Session.set('grantedMenuIDs', props?.editItem?.grantedMenuIDs);
            resetValues(newValues);
        }
    }, [props?.editItem?.randomID]);

    function handleClose() {
        Session.set('grantedMenuIDs', []);
        Session.set('expandedMenuIDs', []);
        resetValues(values);
        props.setOpen(false);
    }

    function handleSave() {
        values.grantedMenuIDs = Session.get('grantedMenuIDs');
        if (values.name !== '' && values.cname !== '' && values.grantedMenuIDs !== []) {
            Meteor.call('role.update', props.editItem._id, values, (error) => {
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
                text: '請輸入角色名稱，中文名稱及說明.',
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">修改角色</h3>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    英文名稱
                                                </label>
                                                <input
                                                    className="input has-text-grey"
                                                    value={values.name}
                                                    readOnly="readOnly"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    中文名稱
                                                </label>
                                                <input
                                                    className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="cname"
                                                    placeholder="請輸入中文名稱"
                                                    required
                                                    value={values.cname}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">說明</label>
                                                <input
                                                    className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="description"
                                                    placeholder="請輸入說明"
                                                    required
                                                    value={values.description}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">權限</label>
                                                <MenuTree />
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
                                    data-bulma-modal="close"
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

ListModal.propTypes = {
    editItem: PropTypes.object,
};

export default ListModal;
