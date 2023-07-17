import React, { useState } from 'react';
import './Login.scss';
import { LogoMoney, IconGoogle, IconFacebook, IconPassword } from '~/components/GlobalStyles/Layout/components/Icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '~/config';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Xác thực mật khẩu chưa chính xác!');
            return;
        }

        try {
            const response = await axios.post('https://moneymoney.azurewebsites.net/api/v1/money-money/accounts', {
                firstName,
                lastName,
                email,
                password,
            });

            setSuccessMessage('Success! Please check your email to complete your registration.');
        } catch (error) {
            console.log('error', error);
            setError('An error occurred during registration.');
        }
    };

    return (
        <div className="Container">
            <div className="Background-Top">
                <span className="Logo">
                    <LogoMoney />
                </span>
                <span className="Title">Money Money</span>
            </div>
            <div className="wrap-form">
                <div className="form-title-text">
                    <span>Đăng Ký</span>
                </div>
                <div className="wrap-form-body">
                    <div className="social">
                        <div className="social-description">
                            <span>Using social networking accounts</span>
                        </div>
                        <div className="social-items">
                            <button className="social-item google">
                                <span className="btn-content">
                                    <IconGoogle />
                                    <span className="social-item-name">Connect with Google</span>
                                </span>
                            </button>
                            <button className="social-item facebook">
                                <span className="btn-content">
                                    <IconFacebook />
                                    <span className="social-item-name">Connect with Facebook</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="network">
                        <div className="account-text">
                            <span>Using Money Money account</span>
                        </div>
                        <form action="" className="form-login" onSubmit={handleSignup}>
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        placeholder="Tên"
                                        id="firstName"
                                        name="firstName"
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        placeholder="Họ"
                                        id="lastName"
                                        name="lastName"
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control password">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="v-input__append-inner">
                                        <IconPassword />
                                    </div>
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control password">
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="XÁC THỰC MẬT KHẨU"
                                    />
                                    <div className="v-input__append-inner">
                                        <IconPassword />
                                    </div>
                                </div>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            {successMessage && <div className="success-message">{successMessage}</div>}
                            <button type="submit" className="btn-submit">
                                <span>Đăng Ký</span>
                            </button>
                        </form>
                        <div className="suggestion">
                            Have an account?{' '}
                            <Link className="suggestion-action" to={config.routes.login}>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Background-Bot"></div>
        </div>
    );
}

export default Register;
