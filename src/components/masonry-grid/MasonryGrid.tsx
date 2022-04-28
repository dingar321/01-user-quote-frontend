import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import QuoteCard from "../quote-card/QuoteCard";
import { MasonryGridStyle } from './MasonryGrid.style'
import ReactPaginate from 'react-paginate'
import Quote from "../../utils/models/Quote";
import { useRecoilState } from "recoil";
import { UserDownvotes, UserState, UserUpvotes } from "../../utils/common/States";
import { getUser } from "../../utils/common/Session";
import User from "../../utils/models/User";

const MasonryGrid = ({ quotes, loading, upvotesArray, downvotesArray }:
    { quotes: Quote[], loading: boolean, upvotesArray: number[], downvotesArray: number[] }) => {

    //Herer we save the user if he is logged in
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const quotesPerPage = 9;

    const pageNumbers: number = Math.ceil(quotes.length / quotesPerPage);

    //here we save the users upvotes and downvotes if he is logged in 
    const [userUpvotesArray, setuserUpvotesArray] = useRecoilState<number[]>(UserUpvotes);
    const [userDownvotesArray, setUserDownvotesArray] = useRecoilState<number[]>(UserDownvotes);


    //Spliting all the quotes depending on what page of the quotes the user is 


    const currentQuotes: Quote[] = quotes.slice(currentPage * quotesPerPage, currentPage * quotesPerPage + 9);

    useEffect(() => {
        setuserUpvotesArray(upvotesArray);
        setUserDownvotesArray(downvotesArray);
        setLoggedUser(getUser());
    }, [])

    //Change page function sets the page number so we can process the correct page
    const changePage = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    }

    if (quotes) {
        return (
            <MasonryGridStyle>
                <div>
                    <div className="pagination">
                        <ReactPaginate
                            pageCount={pageNumbers}
                            onPageChange={changePage}
                            containerClassName="pagination"
                            disabledClassName="pagination-buttons-disabled"
                            activeClassName="pagination-buttons-active"
                            pageClassName="pagination-ul"
                        />
                    </div>
                    <div className="quote-masonry-greid">
                        <Masonry breakpointCols={3} className="masonry" columnClassName="masonry-column">
                            <QuoteCard
                                quotes={currentQuotes.slice(0, 1)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(1, 2)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(2, 3)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(3, 4)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(4, 5)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(5, 6)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(6, 7)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(7, 8)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                            <QuoteCard
                                quotes={currentQuotes.slice(8, 9)}
                                loading={loading}
                                upvotesArray={userUpvotesArray}
                                downvotesArray={userDownvotesArray}
                            />

                        </Masonry>

                    </div>
                </div >
            </MasonryGridStyle >
        );
    } else {
        {/* If no quotes exist */ }
        return <div className="no-quotes">This is looking a little empty</div>
    }

}

export default MasonryGrid