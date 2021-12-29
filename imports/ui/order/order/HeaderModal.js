import React, { Fragment, useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Dialog, Transition } from '@headlessui/react';

import HandleFieldChange from '/imports/ui/component/HandleFieldChange';

const INITIAL_STATE = {
    orderNo: '',
    date: '',
    time: '',
    unit: '',
    masseur: '',
    category: '',
    note: '',
    clientCode: '',
    clientName: '',
    checkTime: new Date(),
    checkStaff: '',
    error: '',
};

const Modal = (props) => {
    const { handleChange, handleFocus, clearValues, resetValues, values } = HandleFieldChange(INITIAL_STATE);
    const cancelButtonRef = useRef(null);

    function handleClose() {
        clearValues();
        props.setOpen(false);
    }

    function handleSave() {
        Meteor.call('order.insert', values, (err) => {
            if (err) {
                values.error = err.reason;
                console.log(values.error);
                resetValues(values);
            } else {
                handleClose();
            }
        });
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">新增訂單</h3>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    訂單編號 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="orderNo"
                                                    placeholder="請輸入訂單編號"
                                                    required
                                                    value={values.orderNo}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    客戶編號 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="clientCode"
                                                    placeholder="請輸入客戶編號"
                                                    required
                                                    value={values.clientCode}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label
                                                    htmlFor="email-address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    客戶姓名
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="clientName"
                                                    placeholder="請輸入客戶姓名"
                                                    required
                                                    value={values.clientName}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">日期</label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="date"
                                                    placeholder="請輸入日期"
                                                    required
                                                    value={values.date}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">時間</label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="time"
                                                    placeholder="請輸入時間"
                                                    required
                                                    value={values.time}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">節數</label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="unit"
                                                    placeholder="請輸入節數"
                                                    required
                                                    value={values.unit}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">類別</label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="category"
                                                    placeholder="請輸入類別"
                                                    required
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    按摩師
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="masseur"
                                                    placeholder="請輸入按摩師"
                                                    required
                                                    value={values.masseur}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    訂單備註
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="note"
                                                    placeholder="請輸入備註"
                                                    required
                                                    value={values.note}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    處理人員
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="checkStaff"
                                                    placeholder="請輸入處理人員"
                                                    required
                                                    value={values.checkStaff}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    處理時間
                                                </label>
                                                <input
                                                    className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    readOnly="readOnly"
                                                    value={values.checkTime}
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

Modal.propTypes = {};

export default Modal;
