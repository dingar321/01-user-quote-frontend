import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Import stlye
import { LandingPageStyle } from './LandingPage.style'
import QuoteCard from '../quote-card/QuoteCard';
import Title from '../title/Title';
import MasonryGrid from '../masonry-grid/MasonryGrid';


const LandingPage = () => {

    //Saving the quotes we get from the api
    const [mostUpvotedQuotes, setMostUpvotedQuotes] = useState([]);
    const [recentlyAddedQuotes, setRecentlyAddedQuotes] = useState([]);
    const user: string = 'not here'


    //Saving the user
    const [loading, setLoading] = useState(false);


    //const user = getUser();

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
            setLoading(false);
        }
        fectchRecentlyAddedQuotes();
        fetchMostUpvotedQuotes();
    }, []);

    //Getting a random quote 
    let randNumber = Math.floor(Math.random() * mostUpvotedQuotes.length);
    var randomQuote = mostUpvotedQuotes.slice(randNumber - 1, randNumber);

    const navigate = useNavigate();
    function navigateRegister() {
        navigate("/signup");
    }

    if (user === 'here') {
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
                            <MasonryGrid quotes={mostUpvotedQuotes} loading={loading} />
                        </div>
                        <div className="most-recent-quotes">
                            <Title
                                title={"Most recent quotes"}
                                description={"Recent quotes, this page updates as soon as a user adds a new quote. Go ahed try adding a new quote and like the ones you find meaningfull"}
                            />
                            <MasonryGrid quotes={recentlyAddedQuotes} loading={loading} />
                        </div>
                    </div>
                </div>
            </LandingPageStyle >
        );
    }
}

export default LandingPage