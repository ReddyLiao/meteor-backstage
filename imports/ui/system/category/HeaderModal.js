import React, { Fragment, useRef, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Dialog, Transition } from '@headlessui/react';

import HandleFieldChange from '/imports/ui/component/HandleFieldChange';

const INITIAL_STATE = {
    code: '',
    name: '',
    description: '',
    imgUrl: '',
    error: '',
};

const Modal = (props) => {
    const { handleChange, handleFocus, clearValues, resetValues, values } = HandleFieldChange(INITIAL_STATE);
    const cancelButtonRef = useRef(null);
    const [imgUrl, setImgUrl] = useState(values.imgUrl);

    function handleClose() {
        clearValues();
        setImgUrl(INITIAL_STATE.imgUrl);
        props.setOpen(false);
    }

    function handleSave() {
        if (values.code !== '' && values.name !== '') {
            Meteor.call('category.insert', values, (err) => {
                if (err) {
                    values.error = err.reason;
                    console.log(values.error);
                    resetValues(values);
                } else {
                    handleClose();
                }
            });
        } else {
            values.error = '請輸入類別編號/類別名稱';
            resetValues(values);
        }
    }

    function handleUploadImg(e) {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            let imgValue = reader.result;
            setImgUrl(imgValue);
            values.imgUrl = imgValue;
            // console.log(imgValue);
        };
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">新增類別</h3>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    類別編號 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="code"
                                                    placeholder="請輸入類別編號"
                                                    required
                                                    value={values.code}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fab fa-slack-hash"></i>
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    類別名稱 *
                                                </label>

                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="name"
                                                    placeholder="請輸入類別名稱"
                                                    required
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
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
                                                    說明
                                                </label>

                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="description"
                                                    placeholder="請輸入說明"
                                                    required
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-comment" />
                                                </span>
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    類別圖案
                                                </label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        {imgUrl ? (
                                                            <img src={imgUrl} alt="Upload-image"></img>
                                                        ) : (
                                                            <div>
                                                                <svg
                                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    viewBox="0 0 48 48"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span>上傳檔案</span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    onChange={handleUploadImg}
                                                                />
                                                            </label>
                                                            {/* <p className="pl-1">or drag and drop</p> */}
                                                        </div>
                                                        {/* <p className="text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 10MB
                                                        </p> */}
                                                    </div>
                                                </div>
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
