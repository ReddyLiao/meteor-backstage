import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [account, setAccount] = useState({
        username: '',
        password: '',
        error: '',
    });

    const history = useHistory();
    const handleChange = (e) => {
        const { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            account[name] = checked;
        } else {
            account[name] = value;
        }
        setAccount(account);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(account.username, account.password, (err) => {
            if (err) {
                account.error = err.reason;
                setAccount({ ...account });
            } else {
                Accounts._autoLoginEnabled = false;
                Accounts._unstoreLoginToken();
                account.error = '';
                history.push('/landing');
            }
        });
    };

    return (
        <div className="bg-gray-100 h-screen" onSubmit={handleSubmit}>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto" src="" alt="Logo" />
                    <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Login</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                                    帳號
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        type="text"
                                        name="username"
                                        placeholder="請輸入帳號"
                                        required
                                        autoComplete="on"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                                    密碼
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        type="password"
                                        name="password"
                                        placeholder="請輸入密碼"
                                        autoComplete="current-password"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <p className="text-red">{account.error}</p>
                            <br />
                            <div>
                                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
