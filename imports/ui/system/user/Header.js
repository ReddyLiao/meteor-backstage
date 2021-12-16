import React, { useContext, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { Random } from 'meteor/random';

import HeaderModal from './HeaderModal';
import { RoutingContext } from '/imports/ui/route';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import { useUsersStore } from '/imports/ui/globalStore';

const INITIAL_STATE = {
    findString: '',
};

const Header = () => {
    const { handleChange, handleFocus, values } = HandleFieldChange(INITIAL_STATE);
    const { setBlockUI } = useContext(RoutingContext);
    const { setFindValues } = useUsersStore();

    useEffect(
        () => () => {
            setFindValues({});
        },
        [],
    );

    function handleInsert() {
        document.getElementById('insert-users-modal').classList.add('is-active');
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
        Meteor.call('users.export', values, function (err, res) {
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
                <span className="field has-addons">
                    <span className="control">
                        <input
                            className="input"
                            type="text"
                            name="findString"
                            id="findString"
                            placeholder="帳號/姓名/EMAIL"
                            value={values.findString}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </span>
                    <span className="control">
                        <button className="button is-primary" onClick={() => handleFind()}>
                            查詢
                        </button>
                    </span>
                </span>
                &nbsp; &nbsp;
                <span className="control">
                    <button className="button is-success" onClick={() => handleExport()}>
                        匯出
                    </button>
                </span>
                <span className="control">
                    <button className="button is-info" onClick={() => handleInsert()}>
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
