import React, { useContext, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { Random } from 'meteor/random';
import { SearchIcon } from '@heroicons/react/solid';
import HeaderModal from './HeaderModal';
import { RoutingContext } from '/imports/ui/route';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import { useButtonStore } from '/imports/ui/globalStore';

const INITIAL_STATE = {
    findString: '',
};

const Header = () => {
    const { handleChange, handleFocus, values } = HandleFieldChange(INITIAL_STATE);
    const { setBlockUI } = useContext(RoutingContext);
    const { setFindValues } = useButtonStore();

    useEffect(
        () => () => {
            setFindValues({});
        },
        [],
    );

    function handleInsert() {
        document.getElementById('insert-button-modal').classList.add('is-active');
        document.getElementsByTagName('html')[0].classList.add('is-clipped');
    }

    function handleFind() {
        values.isAll = true;
        values.randomID = Random.id();
        setFindValues(values);
        return true;
    }

    function handleExport() {
        setBlockUI(true);
        Meteor.call('button.export', values, function (err, res) {
            setBlockUI(false);
            if (res) {
                const data = new Blob([res.out], { type: 'octet/stream' });
                saveAs(data, res.filename);
            }
            if (err) {
                Swal.fire({
                    icon: 'error',
                    title: '錯誤',
                    text: err.error,
                }).then();
            }
        });
    }

    return (
        <div className="padding-left padding-right padding-top">
            <div className="field is-grouped is-horizontal">
                <div className="inline-flex items-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="text"
                            name="findString"
                            id="findString"
                            placeholder="名稱"
                            value={values.findString}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <span className="control">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => handleFind()}
                        >
                            查詢
                        </button>
                    </span>
                </div>
                &nbsp; &nbsp;
                <span className="control">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleExport()}
                    >
                        匯出
                    </button>
                </span>
                &nbsp; &nbsp;
                <span className="control">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => handleInsert()}
                    >
                        新增
                    </button>
                </span>
            </div>
            <HeaderModal />
        </div>
    );
};

Header.propTypes = {};

export default Header;
