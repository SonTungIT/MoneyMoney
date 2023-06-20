import React, { useState, useEffect } from 'react';
import './Login.scss';
import { LogoMoney, IconGoogle, IconFacebook, IconPassword } from '~/components/GlobalStyles/Layout/components/Icons';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import config from '~/config';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="Container">
            <div className="Background-Top">
                <span className="Logo">
                    <LogoMoney></LogoMoney>
                </span>
                <span className="Title">Money Money</span>
            </div>
            <div className="wrap-form">
                <div className="form-title-text">
                    <span>Log In</span>
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
                                    <span class="social-item-name">Connect with Google</span>
                                </span>
                            </button>
                            <button className="social-item facebook">
                                <span className="btn-content">
                                    <IconFacebook />
                                    <span class="social-item-name">Connect with Facebook</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="network">
                        <div className="account-text">
                            <span>Using Money Lover account</span>
                        </div>
                        <form action="" className="form-login">
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
                            <button type="submit" className="btn-submit">
                                <span>Đăng Ký</span>
                            </button>
                        </form>
                        <div className="suggestion">
                            {' '}
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
