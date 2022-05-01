import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    MostRecentQuotes, MostUpvotedQuotes, RandomQuote,
    UserDownvotes, UserState, UserUpvotes
} from '../../utils/common/States';

import { useParams } from 'react-router-dom';
//Import stlye
import { LandingPageStyle } from './LandingPage.style'

//Import components
import QuoteCard from '../quote-card/QuoteCard';
import MasonryGrid from '../masonry-grid/MasonryGrid';
import Title from '../title/Title';
import { getToken } from '../../utils/common/Session';
import User from '../../utils/models/User';
import Quote from '../../utils/models/Quote';


const LandingPage = () => {

    //Herer we save the user if he is logged in
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //Saving the users upvotes and downvotes
    const [loggedUserUpvotes, setLoggedUserUpvotes] = useRecoilState<number[]>(UserUpvotes);
    const [loggedUserDownvotes, setLoggedUserDownvotes] = useRecoilState<number[]>(UserDownvotes);

    //Saving the quotes we get from the api
    const [mostRecentQuotes, setMostRecentQuotes] = useRecoilState<Quote[]>(MostRecentQuotes);
    const [mostUpvotedQuotes, setMostUpvotedQuotes] = useRecoilState<Quote[]>(MostUpvotedQuotes);


    const [singleRandomQuote, setsingleRandomQuote] = useRecoilState<Quote>(RandomQuote);

    //Data loading, fetching ...
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        //First we get the most recent quotes
        const fetchMostRecentQuotes = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3333/most-recent');
            setMostRecentQuotes(response.data);
            setLoading(false);
        }
        fetchMostRecentQuotes();

        //Then we get the most upvoted quotes
        const fetchMostUpvotedQuotes = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3333/most-upvoted');
            setMostUpvotedQuotes(response.data);
            setsingleRandomQuote(response.data[Math.floor(Math.random() * response.data.length)])
            setLoading(false);
        }
        fetchMostUpvotedQuotes();

        //Also getting the users upvoted and downvoted quotes
        const fectchLoggedUserData = async () => {
            setLoading(true);
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
                setLoading(false);
            })
        }
        fectchLoggedUserData();

    }, []);

    const navigate = useNavigate();
    function navigateRegister() {
        navigate("/signup");
    }

    if (loggedUser.userId === 0) {
        {/* If the user is NOT logged in we display this */ }
        return (
            <LandingPageStyle>
                <div className="container">
                    <div className="landing-page">
                        <div className="first-row">
                            <div className="first-row-text">
                                <h1>
                                    Welcome <br />
                                    to <label className="text-orange">Quotastic</label>
                                </h1>
                                <p>
                                    Quotastic is free online platform for you to <br />
                                    explore the quips, quotes, and proverbs. Sign <br />
                                    up and express yourself
                                </p>

                                <button onClick={navigateRegister} className="btn small bord-none bckgrd-orange text-white ">
                                    Sign up
                                </button>
                            </div>
                            <div className="first-row-card">
                                {/* Make this static since we arent logged in 
                                <QuoteCard
                                    quotes={mostUpvotedQuotes}
                                    loading={loading}
                                    upvotesArray={loggedUserUpvotes}
                                    downvotesArray={loggedUserDownvotes}
                                    id={mostUpvotedQuotes[0].quoteId}
                                />
                                */}
                            </div>
                        </div>
                        <div className="landing-page-middle">
                            <h2>
                                Explore the world of
                                <br /> <label className="text-orange">fantastic quotes</label>
                            </h2>
                        </div>
                        <div className="most-recent-quotes">
                            {/* Make this static since we arent logged in
                            <Title
                                title={"Most upvoted quotes"}
                                description={"Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile"}
                            />
                            <MasonryGrid
                                quotes={mostUpvotedQuotes}
                                loading={loading}
                                upvotesArray={loggedUserUpvotes}
                                downvotesArray={loggedUserDownvotes}
                            />
 */}
                        </div>
                    </div>
                </div>
            </LandingPageStyle >
        );
    }
    else {
        {/* If the user is logged in we display this */ }
        return (
            <LandingPageStyle>
                <div className="container">
                    <div className="landing-page">
                        <div className="quote-of-the-day">

                            <Title
                                title={"Quote of the day"}
                                description={"Quote of the day is randomly choosen quote."}
                            />
                            <div className="quote-card">
                                <QuoteCard
                                    quote={singleRandomQuote}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        <div className="most-upvoted-quote">
                            <div>
                                <Title
                                    title={"Most upvoted quotes"}
                                    description={"Most upvoted quotes on the platform. Try upvoting a quote to keep it saved in your profile."}
                                />
                            </div>
                            <MasonryGrid
                                quotes={mostUpvotedQuotes}
                                loading={loading}
                            />
                        </div>

                        <div className="most-recent-quotes">
                            <Title
                                title={"Most recent quotes"}
                                description={"Recent quotes, this page updates as soon as a user adds a new quote. Go ahed try adding a new quote and like the ones you find meaningfull"}
                            />
                            <MasonryGrid
                                quotes={mostRecentQuotes}
                                loading={loading}
                            />
                        </div>

                    </div>
                </div>
            </LandingPageStyle >
        );
    }
}

export default LandingPage