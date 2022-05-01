import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { MostRecentQuotes, MostUpvotedQuotes, RandomQuote, UserDownvotes, UserState, UserUpvotes } from '../../utils/common/States';

//Import style
import { QuoteCardStyle } from './QuoteCard.style'

//Import images
import UpvoteImage from '../../assets/images/card/card-btn-upvote.svg';
import DownvoteImage from '../../assets/images/card/card-btn-downvote.svg';
import UpvoteImageSelected from '../../assets/images/card/card-btn-upvote-selected.svg';
import DownvoteImageSelected from '../../assets/images/card/card-btn-downvote-selected.png';

//Import types
import Quote from '../../utils/models/Quote';
import User from '../../utils/models/User';
import { getToken } from '../../utils/common/Session';


function QuoteCard({ quote, loading }: { quote: Quote, loading: boolean }) {

    //Here we save the user if he is logged in
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //here we save the users upvotes and downvotes if he is logged in 
    const [userUpvotesArray, setuserUpvotesArray] = useRecoilState<number[]>(UserUpvotes);
    const [userDownvotesArray, setUserDownvotesArray] = useRecoilState<number[]>(UserDownvotes);

    const [recievedQuote, setRecievedQuote] = useState<Quote>();

    const [fetching, setFetching] = useState(false);

    //Saving the quotes (Must change when we upvote or downvote)
    const [mostRecentQuotes, setMostRecentQuotes] = useRecoilState<Quote[]>(MostRecentQuotes);
    const [mostUpvotedQuotes, setMostUpvotedQuotes] = useRecoilState<Quote[]>(MostUpvotedQuotes);

    useEffect(() => {
        setRecievedQuote(quote);
    }, [quote]);

    //Upvoting
    const upvoteQuote = () => {
        const upvoteSelectedQuote = async () => {
            const response = await axios.get('http://localhost:3333/' + recievedQuote?.quoteId + '/upvote',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(user => {
                //Get and set the users upvotes and downvotes
                setLoggedUser(user.data);
                setuserUpvotesArray(user.data.upvotes);
                setUserDownvotesArray(user.data.downvotes)

                const updateVotesSelectedQuote = async () => {
                    const response = await axios.get('http://localhost:3333/' + recievedQuote?.quoteId + '/quote',
                        {
                            headers: { Authorization: `Bearer ${getToken()}` },
                            withCredentials: true,
                        }
                    ).then(quote => {
                        //Get and set the users upvotes and downvotes
                        setRecievedQuote({
                            quoteId: quote.data[0].quoteId,
                            content: quote.data[0].content,
                            votes: quote.data[0].votes,
                            created: quote.data[0].created,
                            userTk: quote.data[0].userTk,
                        })

                        const fetchMostRecentQuotes = async () => {
                            const response = await axios.get('http://localhost:3333/most-recent');
                            setMostRecentQuotes(response.data);
                        }
                        fetchMostRecentQuotes();

                        //Then we get the most upvoted quotes
                        const fetchMostUpvotedQuotes = async () => {
                            const response = await axios.get('http://localhost:3333/most-upvoted');
                            setMostUpvotedQuotes(response.data);
                        }
                        fetchMostUpvotedQuotes();
                    })
                }
                updateVotesSelectedQuote();
            })
        }
        upvoteSelectedQuote();
    }

    //Downvoting
    const downvoteQuote = () => {
        const downvoteSelectedQuote = async () => {
            const response = await axios.get('http://localhost:3333/' + recievedQuote?.quoteId + '/downvote',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(user => {
                //Get and set the users upvotes and downvotes
                setLoggedUser(user.data);
                setuserUpvotesArray(user.data.upvotes);
                setUserDownvotesArray(user.data.downvotes)

                const updateVotesSelectedQuote = async () => {
                    const response = await axios.get('http://localhost:3333/' + recievedQuote?.quoteId + '/quote',
                        {
                            headers: { Authorization: `Bearer ${getToken()}` },
                            withCredentials: true,
                        }
                    ).then(quote => {
                        //Get and set the users upvotes and downvotes
                        setRecievedQuote({
                            quoteId: quote.data[0].quoteId,
                            content: quote.data[0].content,
                            votes: quote.data[0].votes,
                            created: quote.data[0].created,
                            userTk: quote.data[0].userTk,
                        })

                        const fetchMostRecentQuotes = async () => {
                            const response = await axios.get('http://localhost:3333/most-recent');
                            setMostRecentQuotes(response.data);
                        }
                        fetchMostRecentQuotes();

                        //Then we get the most upvoted quotes
                        const fetchMostUpvotedQuotes = async () => {
                            const response = await axios.get('http://localhost:3333/most-upvoted');
                            setMostUpvotedQuotes(response.data);
                        }
                        fetchMostUpvotedQuotes();
                    })
                }
                updateVotesSelectedQuote();
            })

        }
        downvoteSelectedQuote();
    }




    if (loading) {
        {/* If no quotes exist */ }
        return <div className="no-quotes">Loading ..</div>
    }
    else if (recievedQuote) {
        return (
            <QuoteCardStyle>
                <div key={recievedQuote.quoteId} className="masonry-card">
                    <div className="card-upvotes">

                        {(userUpvotesArray.includes(recievedQuote.quoteId)) &&
                            /* If the user has upvoted display this */
                            <div className="buttons">
                                <img className="upvote" onClick={() => upvoteQuote()} src={UpvoteImage} />
                                <p>
                                    {recievedQuote.votes}
                                </p>
                                <img onClick={() => downvoteQuote()} src={DownvoteImage} />
                            </div>
                        }

                        {(userDownvotesArray.includes(recievedQuote.quoteId)) &&
                            /* If the user has downvoted display this */
                            <div className="buttons">
                                <img onClick={() => upvoteQuote()} src={UpvoteImage} />
                                <p>
                                    {recievedQuote.votes}
                                </p>
                                <img className="downvote" onClick={() => downvoteQuote()} src={DownvoteImage} />
                            </div>
                        }

                        {
                            (!userUpvotesArray.includes(recievedQuote.quoteId) && !userDownvotesArray.includes(recievedQuote.quoteId)) &&
                            /* If the user has not voted yet display this */
                            <div className="buttons">
                                <img onClick={() => upvoteQuote()} src={UpvoteImage} />
                                <p>
                                    {recievedQuote.votes}
                                </p>
                                <img onClick={() => downvoteQuote()} src={DownvoteImage} />
                            </div>
                        }

                    </div >
                    <div className="card-column">
                        <div className="user">

                            {/* Check if the quote belongs to the logged in user */}
                            {(recievedQuote.userTk.email == loggedUser.email) &&
                                <p className='logged-users-quote'>
                                    {recievedQuote.userTk.firstName} {recievedQuote.userTk.lastName}
                                </p>
                            }

                            {(recievedQuote.userTk.email != loggedUser.email) &&
                                <p>
                                    {recievedQuote.userTk.firstName} {recievedQuote.userTk.lastName}
                                </p>
                            }


                        </div>
                        <div className="content">
                            {recievedQuote.content}
                        </div>
                        <div className="date">
                            {recievedQuote.created.substring(8).substring(2, 0)}
                            {'.'}
                            {recievedQuote.created.substring(5).substring(2, 0)}
                            {'.'}
                            {recievedQuote.created.substring(0, 4)}
                            {' (' + recievedQuote.created.substring(11).substring(0, 5) + ')'}
                        </div>
                    </div>
                </div >

            </QuoteCardStyle >
        );
    }
    else {
        {/* If no quotes exist */ }
        return <div className="no-quotes">This is looking a little empty</div>
    }
}

export default QuoteCard