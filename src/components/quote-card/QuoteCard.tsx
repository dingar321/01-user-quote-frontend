import React, { useEffect, useState } from 'react'
import axios from 'axios';

//Import style
import { QuoteCardStyle } from './QuoteCard.style'

//Import images
import UpvoteImage from '../../assets/images/card/card-btn-upvote.svg';
import DownvoteImage from '../../assets/images/card/card-btn-downvote.svg';
import UpvoteImageSelected from '../../assets/images/card/card-btn-upvote-selected.svg';
import DownvoteImageSelected from '../../assets/images/card/card-btn-downvote-selected.png';

//Import types
import Quote from '../../utils/types/Quote';
import User from '../../utils/types/User';

function QuoteCard({ quotes, loading }: { quotes: Quote[], loading: any }) {
    //Herer we save the user if he is logged in
    const [user, setUser] = useState<User>();

    //Saving the single quote we get from params
    const [singleQuote, setQuote] = useState(quotes[0])

    //here we save the users upvotes and downvotes if he is logged in 
    const [userUpvotesArray, setuserUpvotesArray] = useState<number[]>([]);
    const [userDownvotesArray, setUserDownvotesArray] = useState<number[]>([]);

    useEffect(() => {
        /*
        const fectchLoggedUserData = async () => {
            const response = await axios.get('http://localhost:3333/me',
                {
                    headers: { Authorization: `Bearer ${''}` },
                    withCredentials: true,
                }
            ).then(user => {
                //Get and set the users upvotes and downvotes
                setUser(user.data);
                setUserDownvotesArray(user.data.downvotes);
                setuserUpvotesArray(user.data.upvotes)
            })
        }
        fectchLoggedUserData();
        */
    }, [])

    const upvoteQuote = async () => {
        await axios.get('http://localhost:3333/' + quotes[0].quoteId + '/upvote',
            {
                headers: { Authorization: `Bearer ${''}` },
                withCredentials: true,

            }
        )
    }

    const downvoteQuote = async () => {
        await axios.get('http://localhost:3333/' + quotes[0].quoteId + '/downvote',
            {
                headers: { Authorization: `Bearer ${''}` },
                withCredentials: true,

            }
        )
    }



    if (loading) {
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
                                {quote.userTk.firstName} {quote.userTk.lastName}
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