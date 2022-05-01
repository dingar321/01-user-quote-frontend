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

const MasonryGrid = ({ quotes, loading, }:
    { quotes: Quote[], loading: boolean }) => {

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
                                quote={currentQuotes[0]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[1]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[2]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[3]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[4]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[5]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[6]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[7]}
                                loading={loading}
                            />
                            <QuoteCard
                                quote={currentQuotes[8]}
                                loading={loading}
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