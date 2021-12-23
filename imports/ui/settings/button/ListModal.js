import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import HandleFieldChange from '/imports/ui/component/HandleFieldChange';
import Role from '../../../api/role/collection';

const INITIAL_STATE = {
    system: '',
    name: '',
    description: '',
    roles: [],
    addRole: '',
    error: '',
};

const ListModal = (props) => {
    const { handleChange, handleRemove, handleAdd, handleFocus, resetValues, values } =
        HandleFieldChange(INITIAL_STATE);

    const rolesOptions = Role.find({}, { fields: { _id: 1, name: 1 }, sort: { name: 1 } })
        .fetch()
        .map((item, index) => ({ field: 'addRole', key: `addRole-${index}`, value: item._id, label: item.name }));

    useEffect(() => {
        if (props?.editItem?._id) {
            resetValues({ ...INITIAL_STATE, ...props.editItem });
        }
    }, [props?.editItem?.randomID]);

    function handleClose() {
        resetValues(values);
        document.getElementById('update-button-modal').classList.remove('is-active');
        document.getElementsByTagName('html')[0].classList.remove('is-clipped');
    }

    function handleSave() {
        if (values.system !== '' && values.name !== '' && values.description !== '') {
            values.isSaving = true;
            resetValues(values);
            Meteor.call('button.update', props.editItem._id, values, (err) => {
                if (err) {
                    values.isSaving = false;
                    values.error = err.reason;
                    resetValues(values);
                } else {
                    handleClose();
                }
            });
        } else {
            values.error = '請輸入系統名稱/按鈕名稱/說明/角色.';
            resetValues(values);
        }
    }

    return (
        <div className="modal modal-pos-top modal-fx-fadeInScale" id="update-button-modal">
            <div className="modal-background" onClick={() => handleClose()} />
            <div className="modal-card modal-width-960">
                <header className="modal-card-head has-background-primary">
                    <p className="modal-card-title">{props.title}</p>
                </header>
                <section className="modal-card-body has-text-black">
                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">系統名稱 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            name="system"
                                            placeholder="請輸入系統名稱"
                                            required
                                            value={values.system}
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
                                <label className="label">按鈕名稱 *</label>
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
                                            <i className="fa fa-vote-nay" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">說明 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            name="description"
                                            placeholder="請輸入用途說明"
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
                    </div>

                    <div className="box is-bordered">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">授權角色 *</label>
                            </div>
                            <div className="field-body">
                                <div className="field has-addons">
                                    <p className="control">
                                        <span className="select">
                                            <select name="addRole" value={values.addRole} onChange={handleChange}>
                                                <option value="">請選擇</option>
                                                <option value="all">全部</option>
                                                {rolesOptions.map((c) => (
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
                                    <tbody id="tbodyAddButtonGrantedRoles">
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
