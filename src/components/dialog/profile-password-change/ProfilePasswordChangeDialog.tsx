
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { PasswordChangeDialogState, UserState } from '../../../utils/common/States';
import User from '../../../utils/models/User';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ProfilePasswordChangeDialogStyle } from './ProfilePasswordChangeDialog.style'
import { PopupProps } from '../../../utils/interfaces/PopupProps';
import axios from 'axios';
import { getToken } from '../../../utils/common/Session';

function ProfilePasswordChangeDialog({ openPopup, setOpenPopup }: PopupProps) {

    const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useRecoilState<boolean>(PasswordChangeDialogState);

    //Effects handling
    const errorRef = React.useRef<HTMLInputElement | null>(null)
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    //New password provided by user
    const [newPassword, setNewPassword] = useState<string>()
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>()

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');

    //Herer we save the user
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    const handleSubmitChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.patch('http://localhost:3333/me/password-change',
            JSON.stringify({ newPassword, newPasswordConfirm }),
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(response => {

            //Set the response user (he has been updated)
            setLoggedUser(response.data);

            //Clear all fields:
            setNewPassword('');
            setNewPasswordConfirm('');

            //Close the dialog on submition
            setOpenPasswordChangeDialog(false);

        }).catch(error => {
            if (error.response?.status === 400) {
                setErrorMessage('Values must be provided in the correct format');
            }
            else if (error.response?.status === 404) {
                setErrorMessage('User not found !');
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
        <ProfilePasswordChangeDialogStyle>
            <div className='background'>

                <form onSubmit={handleSubmitChangePassword}>
                    <div className='dialog-window'>

                        <div className='title'>
                            <h1>Change account's <span className='text-orange'>password!</span></h1>
                            <p>Change your account password</p>
                        </div>

                        <div className='middle'>
                            <div className="signup-form-password">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="input-long"
                                    autoComplete="off" required onChange={(e) => setNewPassword(e.target.value)} />
                                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
                                    <br /> Must include uppercase and lowercase letter, a number and a special character. Cannot be same as the old password.
                                </p>

                            </div>
                            <div className="signup-form-password-confirm">
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                                <input type="password" name="passwordConfirm" id="passwordConfirm" className="input-long"
                                    autoComplete="off" required onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                            </div>
                        </div>

                        <div className='footer'>
                            <button className='btn small bckgrd-orange bord-none text-white' >Submit</button>
                            <button className='btn small bckgrd-white bord-orange text-orange' onClick={() => setOpenPasswordChangeDialog(false)}>Cancel</button>

                        </div>
                        <div className="ErrorMessage">
                            <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</p>
                        </div>
                    </div>

                </form>

            </div>
        </ProfilePasswordChangeDialogStyle>
    )
}

export default ProfilePasswordChangeDialog