import React, { useContext, useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { Random } from 'meteor/random';
import { SearchIcon } from '@heroicons/react/solid';

import HeaderModal from './HeaderModal';
import { RoutingContext } from '/imports/ui/route';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import { useOrderStore } from '/imports/ui/globalStore';

const INITIAL_STATE = {
    findString: '',
};

const Header = () => {
    const { handleChange, handleFocus, values } = HandleFieldChange(INITIAL_STATE);
    const { setBlockUI } = useContext(RoutingContext);
    const { setFindValues } = useOrderStore();
    const [open, setOpen] = useState(false);

    useEffect(
        () => () => {
            setFindValues({});
        },
        [],
    );

    function handleInsert() {
        setOpen(true);
    }

    function handleFind() {
        values.randomID = Random.id();
        setFindValues(values);
        return true;
    }
    // function handleExport() {
    //     setBlockUI(true);
    //     Meteor.call('order.export', values, function (err, res) {
    //         setBlockUI(false);
    //         if (res) {
    //             const data = new Blob([res.out], { type: 'octet/stream' });
    //             saveAs(data, res.filename);
    //         }
    //         if (err) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: '錯誤',
    //                 text: err.error,
    //             }).then();
    //         }
    //     });
    // }

    return (
        <div className="py-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-start">
                    <div className="mx-2 inline-flex items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="text"
                                name="findString"
                                id="findString"
                                placeholder="訂單號/類別/日期/時間/按摩師/處理時間/處理人員"
                                value={values.findString}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                        </div>
                        <button
                            type="button"
                            className="mx-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => handleFind()}
                        >
                            查詢
                        </button>
                    </div>
                    <button
                        type="button"
                        className="mx-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleInsert()}
                    >
                        新增
                    </button>
                    {/* <button
                        type="button"
                        className="mx-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-green-700 bg-indigo-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => handleExport()}
                    >
                        匯出
                    </button> */}
                </div>
            </div>
            <HeaderModal open={open} setOpen={setOpen} />
        </div>
    );
};

Header.propTypes = {};

export default Header;
