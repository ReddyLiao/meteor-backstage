import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';

import { Dialog, Transition } from '@headlessui/react';

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
    checkTime: '',
    checkStaff: '',
    error: '',
};

const ListModal = (props) => {
    const { handleChange, handleFocus, resetValues, values } = HandleFieldChange(INITIAL_STATE);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        if (props?.editItem?._id) {
            resetValues({ ...INITIAL_STATE, ...props.editItem });
        }
    }, [props?.editItem?.randomID]);

    function handleClose() {
        resetValues(values);
        props.setOpen(false);
    }

    function handleSave() {
        if (
            values.date !== '' &&
            values.time !== '' &&
            values.unit !== '' &&
            values.masseur !== '' &&
            values.category !== '' &&
            values.checkStaff !== ''
        ) {
            Meteor.call('order.update', props.editItem._id, values, (err) => {
                if (err) {
                    values.error = err.reason;
                    resetValues(values);
                } else {
                    handleClose();
                }
            });
        } else {
            values.error = '請輸入日期/時間/節數/訂單/按摩師/處理人員';
            resetValues(values);
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">修改訂單</h3>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    訂單編號
                                                </label>
                                                <input
                                                    className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    readOnly="readOnly"
                                                    type="text"
                                                    value={values.orderNo}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    客戶編號
                                                </label>
                                                <input
                                                    className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    readOnly="readOnly"
                                                    type="text"
                                                    value={values.clientCode}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    客戶姓名
                                                </label>
                                                <input
                                                    className="mt-1 bg-gray-100  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    readOnly="readOnly"
                                                    type="text"
                                                    value={values.clientName}
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
                                                    value={`${values.time/60|'-'|values.time%60}`}
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
                                                    type="text"
                                                    value={values.checkTime}
                                                />
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
                                </div>
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
