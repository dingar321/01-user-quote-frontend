import React, { useState, useEffect } from "react";
import { SignupStyle } from './Signup.style';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


//https://stackoverflow.com/questions/67193604/how-to-keep-rest-api-calls-in-different-file-in-react-js

const REGISTER_URL = '/auth/signup';

const Signup = () => {
    //Effects handling
    const emailRef = React.useRef<HTMLInputElement | null>(null)
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Values that the user must provide
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');

    //For value validating
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState(false);

    //Handling focus
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);

    //Error handling
    const [errorMessage, setErrorMessage] = useState('');

    //After a succesfull login we get moved to the homepage
    const navigate = useNavigate();
    function navigateLogin() {
        navigate("/login");
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
    }, [email, firstName, lastName, password, passwordConfirm])

    //When the user submits the 
    //form (registration) it triggers
    const handleSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:3333/auth/signup',
            JSON.stringify({ email, firstName, lastName, password, passwordConfirm }),
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        ).then(response => {

            //Clear all fields:
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
            setpasswordConfirm('');

            //Redirects the user if he succesfully registerers
            // --> '/login' (login)
            navigateLogin();

        }).catch(error => {
            if (error.response?.status === 400) {
                setErrorMessage('Values must be provided in the correct format');
            }
            else if (error.response?.status === 404) {
                setErrorMessage('Not found !');
            }
            else if (error.response?.status === 409) {
                setErrorMessage('User with that email already exists');
            }
            else if (error.response?.status === 500) {
                setErrorMessage('Something unexpected went wrong');
            }
            else {
                setErrorMessage('Registration failed')
            }
            errorRef.current?.focus();
        });
    }

    return (
        <SignupStyle>
            <div className="signup-container">
                <div className="signup-header">
                    <h1>
                        What is your <span className="text-orange">name?</span>
                    </h1>
                    <p>Your name will appear on quotes and your public profle.</p>
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmitSignup}>
                        <div className="signup-form-email">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="input-long" ref={emailRef}
                                autoComplete="off" required onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
                        </div>
                        <div className="signup-form-full-name">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" className="input-short"
                                    autoComplete="off" required onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" className="input-short"
                                    autoComplete="off" required onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="signup-form-password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="input-long"
                                autoComplete="off" required onChange={(e) => setPassword(e.target.value)} />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
                                <br /> Must include uppercase and lowercase letter, <br /> a number and a special character.
                            </p>

                        </div>
                        <div className="signup-form-password-confirm">
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input type="password" name="passwordConfirm" id="passwordConfirm" className="input-long"
                                autoComplete="off" required onChange={(e) => setpasswordConfirm(e.target.value)} />
                        </div>
                        <div className="signup-form-button-submit">
                            <button className="btn long bord-none text-white bckgrd-orange">Sign up</button>
                        </div>
                    </form>
                </div>
                <div className="login-href-grid">
                    <p>Already have an account?</p>
                    <a className="text-orange" href="/login">Login</a>
                </div>
                <div className="ErrorMessage">
                    <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</p>
                </div>
            </div>
        </SignupStyle >
    );
}

export default Signup 