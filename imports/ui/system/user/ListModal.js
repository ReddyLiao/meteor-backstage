import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { Session } from 'meteor/session';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Random } from 'meteor/random';

import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import MenuTree from '/imports/ui/component/MenuTree';
import Role from '/imports/api/role/collection';
import { buttonOptions } from '/imports/fixture/button';

const INITIAL_STATE = {
    username: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    roles: [],
    grantedMenus: [],
    grantedButtons: [],
    grantedIPs: [],
    addRole: '',
    addGrantedButton: '',
    addGrantedIP: '',
    error: '',
};

const ListModal = (props) => {
    const { handleChange, handleAdd, handleRemove, resetValues, values } = HandleFieldChange(INITIAL_STATE);

    let roleOptions = [];
    useTracker(() => {
        roleOptions = Role.find({}, { fields: { _id: 1, name: 1 } })
            .fetch()
            .map((item) => ({ value: item._id, label: item.name }));
    });
    useEffect(() => {
        if (props?.editItem?._id) {
            const newValues = {
                username: props?.editItem?.username,
                name: props?.editItem?.profile?.name,
                email:
                    (props?.editItem?.emails && props?.editItem?.emails[0] && props?.editItem?.emails[0]?.address) ||
                    '',
                password: '',
                phone: props?.editItem?.profile?.phone || '',
                roles: props?.editItem?.profile?.roles,
                grantedButtons: props?.editItem?.profile?.grantedButtons,
                grantedIPs: props?.editItem?.profile?.grantedIPs,
                addGrantedIPs: '',
            };

            Session.set('grantedMenuIDs', props?.editItem?.profile?.grantedMenuIDs || '');
            resetValues(newValues);
        }
    }, [props?.editItem?.randomID]);

    function handleClose() {
        Session.set('grantedMenuIDs', []);
        Session.set('expandedMenuIDs', []);
        resetValues(values);
        document.getElementById('update-users-modal').classList.remove('is-active');
        document.getElementsByTagName('html')[0].classList.remove('is-clipped');
    }

    function handleSave() {
        values.grantedMenuIDs = Session.get('grantedMenuIDs');
        if (
            values.username !== '' &&
            values.name !== '' &&
            values?.roles?.length > 0 &&
            values?.grantedIPs?.length > 0
        ) {
            Meteor.call('users.update', props.editItem._id, values, (error) => {
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
                text: '請輸入帳號/姓名/角色/授權IP等資料',
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
        <div className="modal modal-pos-top modal-fx-fadeInScale" id="update-users-modal">
            <div className="modal-background" onClick={() => handleClose()} />
            <div className="modal-card modal-width-960">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title">編輯帳號</p>
                </header>
                <section className="modal-card-body has-text-black">
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">帳號 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input
                                            className="input has-text-grey"
                                            readOnly="readOnly"
                                            value={values.username}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-address-card" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">姓名 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left ">
                                        <input
                                            className="input"
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
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">EMail</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left ">
                                        <input
                                            className="input"
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
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">密碼 </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left ">
                                        <input
                                            className="input"
                                            type="text"
                                            name="password"
                                            placeholder="需要更改時才輸入"
                                            required
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-passport" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">手機 </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left ">
                                        <input
                                            className="input"
                                            type="text"
                                            name="phone"
                                            placeholder="請輸入手機號碼"
                                            required
                                            value={values.phone}
                                            onChange={handleChange}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-phone" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">角色 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field has-addons">
                                    <p className="control">
                                        <span className="select">
                                            <select name="addRole" value={values.addRole} onChange={handleChange}>
                                                <option value="">請選擇</option>
                                                {roleOptions.map((c) => (
                                                    <option key={c.value} value={c.value}>
                                                        {c.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </span>
                                    </p>
                                    <p className="control">
                                        <button
                                            className="button is-primary"
                                            onClick={() => handleAdd('addRole', 'roles')}
                                        >
                                            增加
                                        </button>
                                    </p>
                                </div>
                                <table className="table is-bordered is-striped">
                                    <tbody id="tbodyEditUsersRoles">
                                        {values.roles &&
                                            values?.roles?.map((role, i) => (
                                                <tr key={Random.id()}>
                                                    <td>{role}</td>
                                                    <td>
                                                        <button
                                                            className="button is-danger is-small"
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
                    </div>
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">授權按鈕</label>
                            </div>
                            <div className="field-body">
                                <div className="field has-addons">
                                    <p className="control">
                                        <span className="select">
                                            <select
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
                                        </span>
                                    </p>
                                    <p className="control">
                                        <button
                                            className="button is-primary"
                                            onClick={() => handleAdd('addGrantedButton', 'grantedButtons')}
                                        >
                                            增加
                                        </button>
                                    </p>
                                </div>
                                {values?.grantedButtons?.length > 0 ? (
                                    <table className="table is-bordered is-striped ">
                                        <tbody id="tbodyEditUsersGrantedButtons">
                                            {values.grantedButtons.map((button, i) => (
                                                <tr key={Random.id()}>
                                                    <td>
                                                        {button === 'all'
                                                            ? 'all'
                                                            : _.find(buttonOptions, ['value', button]).label}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="button is-danger is-small"
                                                            onClick={() => handleRemove('grantedButtons', i)}
                                                        >
                                                            刪除
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : undefined}
                            </div>
                        </div>
                    </div>
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">授權功能</label>
                            </div>
                            <div className="field-body">
                                <MenuTree />
                            </div>
                        </div>
                    </div>
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">授權IP</label>
                            </div>
                            <div className="field-body">
                                <div className="field has-addons">
                                    <p className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            name="addGrantedIP"
                                            placeholder="IP"
                                            required
                                            value={values.addGrantedIP}
                                            onChange={handleChange}
                                        />
                                    </p>
                                    <p className="control">
                                        <button
                                            className="button is-primary"
                                            onClick={() => handleAdd('addGrantedIP', 'grantedIPs')}
                                        >
                                            增加
                                        </button>
                                    </p>
                                </div>
                                {values?.grantedIPs?.length > 0 ? (
                                    <table className="table is-bordered is-striped ">
                                        <tbody id="tbodyEditUsersGrantedIPs">
                                            {values.grantedIPs.map((ip, i) => (
                                                <tr key={Random.id()}>
                                                    <td>{ip}</td>
                                                    <td>
                                                        <button
                                                            className="button is-danger is-small"
                                                            onClick={() => handleRemove('grantedIPs', i)}
                                                        >
                                                            刪除
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : undefined}
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot block buttons-container">
                    <button className="button is-success is-highlighted" onClick={() => handleSave()}>
                        存檔
                    </button>
                    <button className="button is-info" data-bulma-modal="close" onClick={() => handleClose()}>
                        離開
                    </button>
                </footer>
            </div>
        </div>
    );
};

ListModal.propTypes = {
    editItem: PropTypes.object,
};

export default ListModal;
