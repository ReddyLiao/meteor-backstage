import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Swal from 'sweetalert2';

import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import MenuTree from '/imports/ui/component/MenuTree';

const INITIAL_STATE = {
    name: '',
    cname: '',
    description: '',
    error: '',
};

const Modal = () => {
    const { handleChange, handleFocus, clearValues, values } = HandleFieldChange(INITIAL_STATE);

    function handleClose() {
        clearValues();
        Session.set('grantedMenuIDs', []);
        Session.set('expandedMenuIDs', []);
        document.getElementById('insert-role-modal').classList.remove('is-active');
        document.getElementsByTagName('html')[0].classList.remove('is-clipped');
    }

    function handleSave() {
        values.grantedMenuIDs = Session.get('grantedMenuIDs');
        if (values.name !== '' && values.cname !== '' && values.description !== '' && values.grantedMenuIDs !== []) {
            Meteor.call('role.insert', values.name, values, (error) => {
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
        <div className="modal modal-pos-top modal-fx-fadeInScale" id="insert-role-modal">
            <div className="modal-background" onClick={() => handleClose()} />
            <div className="modal-card modal-width-960">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title">新的角色</p>
                </header>
                <section className="modal-card-body has-text-black">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">英文名稱</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        name="name"
                                        placeholder="請輸入英文名稱"
                                        required
                                        value={values.name}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-flag" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">中文名稱</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        name="cname"
                                        placeholder="請輸入中文名稱"
                                        required
                                        value={values.cname}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-vote-nay" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">說明</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
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
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">權限</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="box">
                                    <MenuTree />
                                </div>
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
