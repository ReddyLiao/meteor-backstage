import { Accounts } from 'meteor/accounts-base';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RoutingContext } from '/imports/ui/route';

const NavBarEnd = () => {
    const history = useHistory();
    const user = useContext(RoutingContext)?.user || {};
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        error: '',
    });

    function logout() {
        Accounts.logout();
        history.push('/login');
    }

    function showPasswordModal() {
        document.getElementById('password-modal').classList.toggle('is-active');
        document.getElementsByTagName('html')[0].classList.toggle('is-clipped');
    }

    function handleSave() {
        if (password.oldPassword !== '' && password.newPassword !== '') {
            Accounts.changePassword(password.oldPassword, password.newPassword, (error) => {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: '錯誤',
                        text: error.reason,

                    }).then();
                    setPassword(password);
                } else {
                    password.error = '';
                    document.getElementById('password-modal').classList.toggle('is-active');
                    document.getElementsByTagName('html')[0].classList.toggle('is-clipped');
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '請輸入舊密碼及新密碼.',

                // eslint-disable-next-line no-unused-vars
            }).then((r) => {});
            setPassword(password);
        }
    }

    function handleClose() {
        document.getElementById('password-modal').classList.toggle('is-active');
        document.getElementsByTagName('html')[0].classList.toggle('is-clipped');
    }

    const handleChange = (e) => {
        const { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            password[name] = checked;
        } else {
            password[name] = value;
        }
        setPassword(password);
    };

    return (
        <div className="navbar-end px-1-r">
            <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">{user?.profile?.name || ''}</div>
                <div className="navbar-dropdown">
                    <a className="navbarMenu navbar-item is-tab" onClick={showPasswordModal}>
                        <div>
                            <span className="icon is-medium">
                                <i className="fa fa-passport" />
                            </span>
                            更改密碼
                        </div>
                    </a>
                    <a className="navbarMenu navbar-item is-tab" onClick={logout}>
                        <span className="icon is-medium">
                            <i className="fa fa-sign-out" />
                        </span>
                        登出
                    </a>
                </div>
            </div>
            <div className="modal" id="password-modal">
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">更改密碼</p>
                    </header>
                    <section className="modal-card-body has-text-black">
                        <form className="box">
                            <div className="field">
                                <label className="label">帳號</label>
                                <div className="control has-text-grey">
                                    <input
                                        className="input has-text-grey"
                                        type="text"
                                        name="username"
                                        readOnly={true}
                                        autoComplete="off"
                                        value={user?.username || ''}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">舊密碼</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="password"
                                        name="oldPassword"
                                        placeholder="********"
                                        autoComplete="on"
                                        required
                                        onChange={handleChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-lock" />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">新密碼</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="password"
                                        name="newPassword"
                                        autoComplete="on"
                                        placeholder="********"
                                        required
                                        onChange={handleChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-lock" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={handleSave}>
                            確認
                        </button>
                        <button className="button" data-bulma-modal="close" onClick={handleClose}>
                            取消
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default NavBarEnd;
