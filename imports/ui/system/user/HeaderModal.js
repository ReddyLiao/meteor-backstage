import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Swal from 'sweetalert2';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Random } from 'meteor/random';

import Role from '/imports/api/role/collection';
import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import MenuTree from '/imports/ui/component/MenuTree';
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

const Modal = () => {
    const { handleChange, handleAdd, handleRemove, clearValues, values } = HandleFieldChange(INITIAL_STATE);

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
        document.getElementById('insert-users-modal').classList.remove('is-active');
        document.getElementsByTagName('html')[0].classList.remove('is-clipped');
    }

    function handleSave() {
        values.grantedMenuIDs = Session.get('grantedMenuIDs');
        if (
            values.name !== '' &&
            values.username !== '' &&
            values.password !== '' &&
            values?.roles.length > 0 &&
            values?.grantedIPs.length > 0
        ) {
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
                text: '請輸入帳號/姓名/密碼/角色/授權IP等資料',
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
        <div className="modal modal-pos-top modal-fx-fadeInScale" id="insert-users-modal">
            <div className="modal-background" onClick={() => handleClose()} />
            <div className="modal-card modal-width-960">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title">新的帳號</p>
                </header>
                <section className="modal-card-body has-text-black">
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">帳號 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left ">
                                        <input
                                            className="input"
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
                                <label className="label">密碼 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left ">
                                        <input
                                            className="input"
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
                                            <select
                                                id="idNewUsersRoles"
                                                name="addRole"
                                                value={values.addRole}
                                                onChange={handleChange}
                                            >
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
                                    <tbody id="tbodyNewUsersRoles">
                                        {values.roles &&
                                            values.roles.map((role, i) => (
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
                                <table className="table is-bordered is-striped ">
                                    <tbody id="tbodyNewUsersGrantedButtons">
                                        {values.grantedButtons &&
                                            values.grantedButtons.map((button, i) => (
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
                                            id="idNewUsersGrantedIPs"
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
                                <table className="table is-bordered is-striped ">
                                    <tbody id="tbodyNewUsersGrantedIPs">
                                        {values.grantedIPs &&
                                            values.grantedIPs.map((ip, i) => (
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

Modal.propTypes = {};

export default Modal;
