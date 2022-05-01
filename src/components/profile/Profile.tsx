import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken, getUser } from "../../utils/common/Session";
import { ProfileStyle } from "./Profile.style";
import Masonry from "react-masonry-css";

//Importing images
import ProfileBackground from '../../assets/images/profile/dashboard-bckgrd-curve-rectangle.png';
import { useRecoilState } from "recoil";
import User from "../../utils/models/User";
import { UserDownvotes, UserQuotes, UserState, UserUpvotedQuotes, UserUpvotes } from "../../utils/common/States";
import Quote from "../../utils/models/Quote";
import MasonryGrid from "../masonry-grid/MasonryGrid";

const Profile = () => {

    //Dialog toggling
    const [openNameChangeDialog, setOpenNameChangeDialog] = useState<boolean>(false);
    const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false);

    //Herer we save the user
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);
    //saving the users karma
    const [userKarma, setUserKarma] = useState<number>();

    //Saving the users quotes and the quotes that the user has 
    const [userQuotes, setUserQuotes] = useRecoilState<Quote[]>(UserQuotes);
    const [userUpvotedQuotes, setUserUpvotedQuotes] = useRecoilState<Quote[]>(UserUpvotedQuotes);

    //here we save the users upvotes and downvotes if he is logged in 
    const [loggedUserUpvotes, setLoggedUserUpvotes] = useRecoilState<number[]>(UserUpvotes);
    const [loggedUserDownvotes, setLoggedUserDownvotes] = useRecoilState<number[]>(UserDownvotes);

    const [loading, setLoading] = useState(false);


    //Getting the data from the database
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
                setLoggedUserUpvotes(user.data.upvotes);
                setLoggedUserDownvotes(user.data.downvotes)
            })
        }

        const fetchUserKarma = async () => {
            await axios.get('http://localhost:3333/me/karma ',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(response => {
                setUserKarma(response.data);
            })
        }


        const fetchUserQuotes = async () => {
            await axios.get('http://localhost:3333/user-quotes ',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(response => {
                setLoading(true);
                setUserQuotes(response.data);
                setLoading(false);
            })
        }

        const fetchUserUpvotedQutoes = async () => {
            await axios.get('http://localhost:3333/user-upvoted-quotes ',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(response => {
                setLoading(true);
                setUserUpvotedQuotes(response.data);
                setLoading(false);
            })
        }

        fectchLoggedUserData();
        fetchUserQuotes();
        fetchUserKarma();
        fetchUserUpvotedQutoes();
    }, []);




    useEffect(() => {
        const fetchUserKarma = async () => {
            await axios.get('http://localhost:3333/me/karma ',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(response => {
                setUserKarma(response.data);
            })
        }
        fetchUserKarma();
    }, [loggedUserUpvotes, loggedUserDownvotes])

    useEffect(() => {

    }, [userQuotes])

    return (
        <ProfileStyle>
            <div className="container">
                <div className="profile">

                    <div className="user-information">
                        <div className="name">
                            <p className="full-name">
                                {loggedUser.firstName} {loggedUser.lastName}
                            </p>
                        </div>
                        <div className="user-karma">
                            <div className="square">
                                <p>Quotastic karma</p>
                                <p className="karma">
                                    {userKarma}
                                </p>
                            </div>
                        </div>
                        <p className="profile-settings">
                            <button onClick={() => setOpenPasswordChangeDialog(true)} >Change full name</button>
                            <br />
                            <button onClick={() => setOpenNameChangeDialog(true)} >Change password</button>
                        </p>
                    </div>

                    <div className="user-quote">
                        <h1>Users quotes</h1>
                        <MasonryGrid
                            quotes={userQuotes}
                            loading={loading}
                        />
                    </div>

                    <div className="user-liked-quotes">
                        <h1>Users liked quotes</h1>
                        <MasonryGrid
                            quotes={userUpvotedQuotes}
                            loading={loading}
                        />
                    </div>

                </div>
            </div>
        </ProfileStyle >
    )
}

export default Profile;