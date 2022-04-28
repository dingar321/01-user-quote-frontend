import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import QuoteCard from "../quote-card/QuoteCard";
import { MasonryGridStyle } from './MasonryGrid.style'
import ReactPaginate from 'react-paginate'
import Quote from "../../utils/types/Quote";

const MasonryGrid = ({ quotes, loading, }: { quotes: Quote[], loading: boolean, }) => {

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [quotesPerPage, setQuotesPerPage] = useState<number>(9);

    const pageNumbers: number = Math.ceil(quotes.length / quotesPerPage);

    //Spliting all the quotes depending on what page of the quotes the user is 
    const currentQuotes: Quote[] = quotes.slice(currentPage, currentPage + quotesPerPage);

    //We only need to split the 9 quotes to individual quote
    const firstQuote: Quote[] = currentQuotes.slice(0, 1);
    const secondQuote: Quote[] = currentQuotes.slice(1, 2);
    const thirdQuote: Quote[] = currentQuotes.slice(2, 3);
    const fourthQuote: Quote[] = currentQuotes.slice(3, 4);
    const fifthQuote: Quote[] = currentQuotes.slice(4, 5);
    const sixthtQuote: Quote[] = currentQuotes.slice(5, 6);
    const seventhQuote: Quote[] = currentQuotes.slice(6, 7);
    const eighthQuote: Quote[] = currentQuotes.slice(7, 8);
    const ninthQuote: Quote[] = currentQuotes.slice(8, 9);

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
                            <QuoteCard quotes={firstQuote} loading={loading} />
                            <QuoteCard quotes={secondQuote} loading={loading} />
                            <QuoteCard quotes={thirdQuote} loading={loading} />
                            <QuoteCard quotes={fourthQuote} loading={loading} />
                            <QuoteCard quotes={fifthQuote} loading={loading} />
                            <QuoteCard quotes={sixthtQuote} loading={loading} />
                            <QuoteCard quotes={seventhQuote} loading={loading} />
                            <QuoteCard quotes={eighthQuote} loading={loading} />
                            <QuoteCard quotes={ninthQuote} loading={loading} />
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