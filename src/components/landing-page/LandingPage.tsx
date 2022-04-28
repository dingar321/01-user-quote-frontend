import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserDownvotes, UserState, UserUpvotes } from '../../utils/common/States';

//Import stlye
import { LandingPageStyle } from './LandingPage.style'

//Import components
import QuoteCard from '../quote-card/QuoteCard';
import MasonryGrid from '../masonry-grid/MasonryGrid';
import Title from '../title/Title';
import { getToken } from '../../utils/common/Session';
import User from '../../utils/models/User';


const LandingPage = () => {

    //Herer we save the user if he is logged in
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    const [loggedUserUpvotes, setLoggedUserUpvotes] = useRecoilState<number[]>(UserUpvotes);
    const [loggedUserDownvotes, setLoggedUserDownvotes] = useRecoilState<number[]>(UserDownvotes);

    //Saving the quotes we get from the api
    const [mostUpvotedQuotes, setMostUpvotedQuotes] = useState([]);
    const [recentlyAddedQuotes, setRecentlyAddedQuotes] = useState([]);

    //Data loading 
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fectchRecentlyAddedQuotes = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3333/recently-added');
            setRecentlyAddedQuotes(response.data);
            setLoading(false);
        }

        const fetchMostUpvotedQuotes = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3333/most-upvoted');
            setMostUpvotedQuotes(response.data);

        }
        fectchRecentlyAddedQuotes();
        fetchMostUpvotedQuotes();

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

    //Getting a random quote 
    let randNumber = Math.floor(Math.random() * mostUpvotedQuotes.length);
    var randomQuote = mostUpvotedQuotes.slice(randNumber - 1, randNumber);

    const navigate = useNavigate();
    function navigateRegister() {
        navigate("/signup");
    }

    if (!loggedUser) {
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
                                {/* Make this static since we arent logged in */}
                                <QuoteCard
                                    quotes={randomQuote}
                                    loading={loading}
                                    upvotesArray={loggedUserUpvotes}
                                    downvotesArray={loggedUserDownvotes}
                                />
                            </div>
                        </div>
                        <div className="landing-page-middle">
                            <h2>
                                Explore the world of
                                <br /> <label className="text-orange">fantastic quotes</label>
                            </h2>
                        </div>
                        <div className="most-recent-quotes">
                            {/* Make this static since we arent logged in */}
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
                                    quotes={randomQuote}
                                    loading={loading}
                                    upvotesArray={loggedUserUpvotes}
                                    downvotesArray={loggedUserDownvotes}
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
                                upvotesArray={loggedUserUpvotes}
                                downvotesArray={loggedUserDownvotes}
                            />
                        </div>
                        <div className="most-recent-quotes">
                            <Title
                                title={"Most recent quotes"}
                                description={"Recent quotes, this page updates as soon as a user adds a new quote. Go ahed try adding a new quote and like the ones you find meaningfull"}
                            />
                            <MasonryGrid
                                quotes={recentlyAddedQuotes}
                                loading={loading}
                                upvotesArray={loggedUserUpvotes}
                                downvotesArray={loggedUserDownvotes}
                            />
                        </div>
                    </div>
                </div>
            </LandingPageStyle >
        );
    }
}

export default LandingPage