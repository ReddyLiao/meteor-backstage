import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';

import { Dialog, Transition } from '@headlessui/react';

const INITIAL_STATE = {
    page: '',
    title: '',
    description: '',
    image: '',
    error: '',
};

const ListModal = (props) => {
    const { handleChange, handleFocus, resetValues, values } = HandleFieldChange(INITIAL_STATE);
    const cancelButtonRef = useRef(null);
    const [showImg, setShowImg] = useState(values.image);

    useEffect(() => {
        if (props?.editItem?._id) {
            const newValues = {
                page: props?.editItem?.page,
                title: props?.editItem?.content?.title,
                description: props?.editItem?.content?.description,
                image: props?.editItem?.content?.image,
            };
            resetValues(newValues);
        }
    }, [props?.editItem?.randomID]);

    function handleClose() {
        resetValues(values);
        setShowImg(INITIAL_STATE.image);
        props.setOpen(false);
    }

    function handleSave() {
        if (values.page !== '' && values.title !== '') {
            Meteor.call('boarding.update', props.editItem._id, values, (err) => {
                if (err) {
                    values.error = err.reason;
                    resetValues(values);
                } else {
                    handleClose();
                }
            });
        } else {
            values.error = '請輸入頁面編號/標題';
            resetValues(values);
        }
    }
    function handleUploadImg(e) {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            let imgValue = reader.result;
            setShowImg(imgValue);
            values.image = imgValue;
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">編輯類別</h3>

                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    頁面編號 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="page"
                                                    placeholder="請輸入類別編號"
                                                    required
                                                    value={values.page}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    頁面標題 *
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="title"
                                                    placeholder="請輸入頁面標題"
                                                    required
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    頁面描述
                                                </label>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="description"
                                                    placeholder="請輸入頁面描述"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    頁面動畫
                                                </label>
                                                <a href="https://lottiefiles.com/featured" target="_blank">
                                                    <button className="bg-white mx-2 py-2 px-4 shadow-sm text-sm font-medium text-gray-500">
                                                        支援動畫來源:
                                                        <img
                                                            className="h-8"
                                                            src="https://static.lottiefiles.com/images/v3/lottiefiles-logo.svg"
                                                        />
                                                    </button>
                                                </a>
                                                <input
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    type="text"
                                                    name="image"
                                                    placeholder="請填入動畫網址"
                                                    value={values.image}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                                {/* <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center grid justify-items-center">
                                                    
                                                        {showImg ? (
                                                            <img
                                                                src={showImg}
                                                                alt="Upload-image"
                                                                className="h-20 w-20 object-cover"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={values.image}
                                                                alt="Upload-image"
                                                                className="h-20 w-20 object-cover"
                                                            />
                                                        )}
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer px-4 py-2 rounded-md text-sm font-medium border  focus:outline-none focus:ring transition text-green-600 bg-green-50 border-green-200 hover:bg-green-100 active:bg-green-200 focus:ring-green-300"
                                                            >
                                                                <span>重新上傳圖片</span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    onChange={handleUploadImg}
                                                                />
                                                            </label>
                                                            <button
                                                                className="mx-2 py-1 px-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-red-600 bg-red-50 hover:text-red-800 hover:bg-red-100 active:bg-red-200 focus:ring-red-300"
                                                                onClick={() => {
                                                                    setShowImg(INITIAL_STATE.image);
                                                                    values.image = '';
                                                                }}
                                                            >
                                                                取消
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div> */}
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

ListModal.propTypes = {
    editItem: PropTypes.object,
};

export default ListModal;
