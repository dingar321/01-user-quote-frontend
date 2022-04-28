import { useRef, useState, useEffect } from "react";
import { LoginStyle } from "./Login.style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const Login = () => {
    //Effects handling
    const emailRef = React.useRef<HTMLInputElement | null>(null)
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Values that the user must provide
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Error handling
    const [errorMessage, setErrorMessage] = useState('');

    //After a succesfull login we get moved to the homepage
    const navigate = useNavigate();
    function navigateHome() {
        navigate("/");
    }

    //Automaticly sets focus on the email field
    //When the component loads
    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    //Anytime there is an error and the user changes the state
    //Of any four inputs the error message is hidden
    useEffect(() => {
        setErrorMessage('');
    }, [email, password])


    //When the user submits the
    //form (login) it triggers
    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:3333/auth/login',
            JSON.stringify({ email, password }),
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        ).then(response => {

            //setUserSession(response.data, "token")
            //setUser(getUser());

            //Clear all fields:
            setEmail('');
            setPassword('');

            //Redirects the user if he succesfully registerers
            // --> '/' (home)

            navigateHome();


        }).catch(error => {
            if (error.response?.status === 400) {
                setErrorMessage('Login failed, email and password are not correct. Try again !');
            }
            else if (error.response?.status === 401) {
                setErrorMessage('Login failed, email and password are not correct. Try again !');
            }
            else if (error.response?.status === 404) {
                setErrorMessage('Login failed, email and password are not correct. Try again !');
            }
            else if (error.response?.status === 500) {
                setErrorMessage('Login failed, email and password are not correct. Try again !');
            }
            else {
                setErrorMessage('Login failed, email and password are not correct. Try again !');
            }
            errorRef.current?.focus();
        });
    }

    return (
        <LoginStyle>
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome <span className="text-orange">back!</span></h1>
                    <p>Thank you for coming back. Hope you have a good day and inspire others.</p>
                </div>
                <div className="login-form">
                    <div className="login-form">
                        <form onSubmit={handleSubmitLogin}>
                            <div className="login-form-email">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input type="text" id="email" className="input-long" ref={emailRef} autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)} value={email} required
                                />
                            </div>
                            <div className="login-form-password">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" id="password" className="input-long"
                                    onChange={(e) => setPassword(e.target.value)} value={password} required
                                />
                            </div>
                            <div className="login-form-button-submit">
                                <button className="btn long bord-orange text-orange bckgrd-white">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="ErrorMessage">
                        <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"}
                            aria-live="assertive" >{errorMessage}</p>
                    </div>
                </div>
            </div>
        </LoginStyle>
    );
}

export default Login;