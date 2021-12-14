import { Accounts } from 'meteor/accounts-base';
import React, { useState, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RoutingContext } from '/imports/ui/route';
import { Menu, Transition } from '@headlessui/react';

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
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
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
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="">{user?.profile?.name || ''}</div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onClick={showPasswordModal}
                >
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                )}
                            >
                                <span className="icon is-medium">
                                    <i className="fa fa-passport" />
                                </span>
                                更改密碼
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item onClick={logout}>
                        {({ active }) => (
                            <a
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                )}
                            >
                                <span className="icon is-medium">
                                    <i className="fa fa-passport" />
                                </span>
                                登出
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
            {/* <div className="modal" id="password-modal">
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
            </div> */}
        </Menu>
    );
};

export default NavBarEnd;
