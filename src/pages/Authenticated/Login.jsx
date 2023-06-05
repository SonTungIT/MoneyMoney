import React, { useState } from 'react';
import './Login.scss';
import { LogoMoney, IconGoogle, IconFacebook, IconPassword } from '~/components/GlobalStyles/Layout/components/Icons';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append('accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            email: email, // Sử dụng giá trị từ state
            password: password, // Sử dụng giá trị từ state
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://money-money.azurewebsites.net/api/v1/money-money/accounts/authentication', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

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
                        <form action="" className="form-login" onSubmit={handleLogin}>
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
                            <div className="forgot-password">
                                <span className="forgot-password-text">Forgot Password</span>
                            </div>
                            <button type="submit" className="btn-submit">
                                <span>Login</span>
                            </button>
                        </form>
                        <div className="suggestion">
                            {' '}
                            Don’t have an account? <span className="suggestion-action">Register</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Background-Bot"></div>
        </div>
    );
}

export default Login;
