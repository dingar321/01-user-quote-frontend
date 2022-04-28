import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserDownvotes, UserState, UserUpvotes } from '../../utils/common/States';

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
import { getToken, getUser } from '../../utils/common/Session';


function QuoteCard({ quotes, loading, upvotesArray, downvotesArray }:
    { quotes: Quote[], loading: boolean, upvotesArray: number[], downvotesArray: number[] }) {

    //Herer we save the user if he is logged in
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //Saving the single quote we get from params
    const [singleQuote, setQuote] = useState(quotes[0])

    //here we save the users upvotes and downvotes if he is logged in 
    const [userUpvotesArray, setuserUpvotesArray] = useRecoilState<number[]>(UserUpvotes);
    const [userDownvotesArray, setUserDownvotesArray] = useRecoilState<number[]>(UserDownvotes);

    useEffect(() => {
        setuserUpvotesArray(upvotesArray);
        setUserDownvotesArray(downvotesArray);
        setLoggedUser(getUser());

    }, [])

    const upvoteQuote = async () => {
        const upvoteSelectedQuote = async () => {
            const response = await axios.get('http://localhost:3333/' + quotes[0].quoteId + '/upvote',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(user => {
                //Get and set the users upvotes and downvotes
                setLoggedUser(user.data);
                setuserUpvotesArray(user.data.upvotes);
                setUserDownvotesArray(user.data.downvotes)
            })
        }
        upvoteSelectedQuote();
    }

    const downvoteQuote = async () => {
        const downvoteSelectedQuote = async () => {
            const response = await axios.get('http://localhost:3333/' + quotes[0].quoteId + '/downvote',
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                    withCredentials: true,
                }
            ).then(user => {
                //Get and set the users upvotes and downvotes
                setLoggedUser(user.data);
                setuserUpvotesArray(user.data.upvotes);
                setUserDownvotesArray(user.data.downvotes)
            })
        }
        downvoteSelectedQuote();
    }



    if (loading) {
        {/* If the call to the api is still fetching */ }
        return <p className="loading">Loading...</p>
    } else if (quotes) {
        return (
            <QuoteCardStyle>
                {quotes.map((quote: Quote, i: number) => (
                    <div key={quote.quoteId} className="masonry-card">
                        <div className="card-upvotes">

                            {(userUpvotesArray.includes(quotes[0].quoteId)) &&
                                /* If the user has upvoted display this */
                                <div className="buttons">
                                    <img className="upvote" onClick={() => upvoteQuote()} src={UpvoteImageSelected} />
                                    <p>
                                        {quote.votes}
                                    </p>
                                    <img onClick={() => downvoteQuote()} src={DownvoteImage} />
                                </div>
                            }

                            {(userDownvotesArray.includes(quotes[0].quoteId)) &&
                                /* If the user has downvoted display this */
                                <div className="buttons">
                                    <img onClick={() => upvoteQuote()} src={UpvoteImage} />
                                    <p>
                                        {quote.votes}
                                    </p>
                                    <img className="downvote" onClick={() => downvoteQuote()} src={DownvoteImageSelected} />
                                </div>
                            }

                            {
                                (!userUpvotesArray.includes(quotes[0].quoteId) && !userDownvotesArray.includes(quotes[0].quoteId)) &&
                                /* If the user has not voted yet display this */
                                <div className="buttons">
                                    <img onClick={() => upvoteQuote()} src={UpvoteImage} />
                                    <p>
                                        {quote.votes}
                                    </p>
                                    <img onClick={() => downvoteQuote()} src={DownvoteImage} />
                                </div>
                            }

                        </div >
                        <div className="card-column">
                            <div className="user">

                                {/* Check if the quote belongs to the logged in user */}
                                {(quote.userTk.email == loggedUser.email) &&
                                    <p className='logged-users-quote'>
                                        {quote.userTk.firstName} {quote.userTk.lastName}
                                    </p>
                                }

                                {(quote.userTk.email != loggedUser.email) &&
                                    <p>
                                        {quote.userTk.firstName} {quote.userTk.lastName}
                                    </p>
                                }


                            </div>
                            <div className="content">
                                {quote.content}
                            </div>
                            <div className="date">
                                {quote.created.substring(8).substring(2, 0)}
                                {'.'}
                                {quote.created.substring(5).substring(2, 0)}
                                {'.'}
                                {quote.created.substring(0, 4)}
                                {' (' + quote.created.substring(11).substring(0, 5) + ')'}
                            </div>
                        </div>
                    </div >
                ))[0]
                }
            </QuoteCardStyle >
        );
    }
    else {
        {/* If no quotes exist */ }
        return <div className="no-quotes">This is looking a little empty</div>
    }
}

export default QuoteCard