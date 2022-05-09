import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './LoginScreen.css';
import { useEffect, useState } from "react";
import * as actions from '../actions/loginAction.jsx';
import { connect, useDispatch } from 'react-redux';
import * as constant from '../constant-message.jsx';
function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();

    const onTextBoxEmail = (event) => {
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const value = event.target.value;
        if (value.trim() === "") {
            setEmailError(constant.EMAIL_REQUIRED);
        }
        else if (!pattern.test(value)) {
            setEmailError(constant.EMAIL_TYPE);
        }
        else {
            setEmailError("");
            setEmail(value);
        }
    }
    const onTextBoxPassword = (event) => {
        if (event.target.value.trim() === "") {
            setPasswordError(constant.PASSWORD_REQUIRED);
        }
        else {
            setPasswordError("");
            setPassword(event.target.value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (emailError === "" && passwordError === "") {
            await props.onLogin(email, password);

            if (localStorage.getItem('token') !== null) {
                window.location.href = "/";
            }
        }

    }
    console.log(email,"asda");
    console.log('pasa',password);
    return (
        <div className="center-container-login">
            <div className="header-w3l">
                <h1>Porto</h1>
            </div>
            <div className="container-login">
                <div className="login-form">
                    <div className="main-content-agile">
                        <div className="sub-main-w3">
                            <div className="wthree-pro">
                                <h2>Login </h2>
                            </div>
                            <div>
                                {<div className="error-message">{props.error}</div>}
                            </div>
                            <form>
                                <div className="pom-agile">
                                    {<div className="error-message">{emailError}</div>}
                                    <input placeholder="Email"
                                        name="email"
                                        className="user"
                                        type="text"
                                        required=""
                                        onChange={(event) => onTextBoxEmail(event)}
                                    />
                                    <span className="icon1"><i className="fa fa-user" aria-hidden="true"></i></span>
                                </div>
                                <div className="pom-agile">
                                    {<div className="error-message">{passwordError}</div>}
                                    <input placeholder="Password"
                                        name="password"
                                        className="pass"
                                        type="password"
                                        required=""
                                        onChange={(event) => onTextBoxPassword(event)}
                                    />
                                    <span className="icon2"><i className="fa fa-unlock" aria-hidden="true"></i></span>
                                </div>
                                <div className="sub-w3l">
                                    <h6><Link to="/forgotPassword">Forgot Password?</Link></h6>
                                    <div className="right-w3l">
                                        <button onClick={(event) => onSubmit(event)}>Login</button>
                                    </div>

                                    <div className="link-register">
                                        Don't have account? <Link to='/register'>Register here</Link>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    // return {
    //     isSuccess: state.login.isSuccess,
    //     userId: state.login.userId,
    //     token: state.login.token,
    //     fullName: state.login.fullName,
    //     role: state.login.role,
    //     error: state.login.error,
    //     loading: state.login.loading,
    // };
};

const mapDispatchToProps = dispatch => {
    // return {
    //     onLogin: (email, password) => dispatch(actions.login(email, password)),
    // };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);