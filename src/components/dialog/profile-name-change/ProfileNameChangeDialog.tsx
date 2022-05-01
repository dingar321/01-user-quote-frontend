import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { getToken } from '../../../utils/common/Session';
import { UserState } from '../../../utils/common/States';
import { PopupProps } from '../../../utils/interfaces/PopupProps';
import User from '../../../utils/models/User';
import { ProfileNameChangeDialogStyle } from './ProfileNameChangeDialog.style'

function ProfileNameChangeDialog({ openPopup, setOpenPopup }: PopupProps) {

    //Effects handling
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');

    //Herer we save the user
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //Name and password 
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();

    useEffect(() => {
        //Also getting the users upvoted and downvoted quotes
        const fectchLoggedUserData = async () => {
            const response = await axios.get('http://localhost:3333/me',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(user => {
                //Get and set the users upvotes and downvotes
                setLoggedUser(user.data);
                setFirstName(user.data.firstName);
                setLastName(user.data.lastName)
            })
        }
        fectchLoggedUserData();
    }, []);

    const handleSubmitChangeName = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:3333/me/name-change',
            JSON.stringify({ firstName, lastName }),
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
            setFirstName('');
            setLastName('');

            //Close the dialog on submition
            setOpenPopup(false);

        }).catch(error => {
            if (error.response?.status === 400) {
                setErrorMessage('Values must be provided in the correct format');
            }
            else if (error.response?.status === 404) {
                setErrorMessage('User not found!');
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
        <ProfileNameChangeDialogStyle>
            <div className='background'>
                <div className='dialog-window'>

                    <div className='title'>
                        <h1>Change account's <span className='text-orange'>full name!</span></h1>
                        <p>Change your account's first or last name</p>
                    </div>

                    <div className='body'>
                        <form onSubmit={handleSubmitChangeName}>
                            <div className="signup-form-full-name">
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" name="firstName" id="firstName" className="input-short"
                                        autoComplete="off" required onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" name="lastName" id="lastName" className="input-short"
                                        autoComplete="off" required onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                </div>
                            </div>
                            <div className='footer'>
                                <button className='btn small bckgrd-orange bord-none text-white' >Submit</button>
                                <button className='btn small bckgrd-white bord-orange text-orange' onClick={() => setOpenPopup(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>

                    <div className="ErrorMessage">
                        <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</p>
                    </div>


                </div>
            </div>
        </ProfileNameChangeDialogStyle>
    )
}

export default ProfileNameChangeDialog