import React, { useRef, useState, useEffect, LegacyRef } from 'react'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { QuoteAddDialogStyle } from './QuoteAddDialog.style';
import axios from 'axios';
import { getToken } from '../../../utils/common/Session';
import { useRecoilState } from 'recoil';
import Quote from '../../../utils/models/Quote';
import { MostRecentQuotes, MostUpvotedQuotes } from '../../../utils/common/States';

interface PopupProps {
    openPopup: boolean;
    setOpenPopup: (open: boolean) => void;
}

function QuoteAddDialog({ openPopup, setOpenPopup }: PopupProps) {

    //Effects handling
    //const contentRef = React.useRef<LegacyRef<HTMLTextAreaElement> | null>(null)
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //The array's that contains all of the quotes (must be updated)
    const [mostRecentQuotes, setMostRecentQuotes] = useRecoilState<Quote[]>(MostRecentQuotes);
    const [mostUpvotedQuotes, setMostUpvotedQuotes] = useRecoilState<Quote[]>(MostUpvotedQuotes);

    //Values that the user must provide
    const [content, setContent] = useState('');

    //Handling focus
    const [contentFocus, setContentFocus] = useState(false);

    //Error handling
    const [errorMessage, setErrorMessage] = useState('');

    //Automaticly sets focus on the content field
    //When the component loads
    useEffect(() => {
        //contentRef.current?.focus();
    }, [])

    //Anytime there is an error and the user changes the state
    //Of any four inputs the error message is hidden
    useEffect(() => {
        setErrorMessage('');
    }, [content])

    //When the user submits the 
    //form (Add quote) it triggers
    const handleSubmitAddQuote = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:3333/addquote',
            JSON.stringify({ content }),
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(response => {

            const fetchMostRecentQuotes = async () => {
                const response = await axios.get('http://localhost:3333/most-recent');
                setMostRecentQuotes(response.data);
            }
            fetchMostRecentQuotes();

            const fetchMostUpvotedQuotes = async () => {
                const response = await axios.get('http://localhost:3333/most-upvoted');
                setMostUpvotedQuotes(response.data);
            }
            fetchMostUpvotedQuotes();


            //Clear all fields:
            setContent('');
            setOpenPopup(false);

        }).catch(error => {
            if (error.response?.status === 400) {
                setErrorMessage('Values must be provided in the correct format');
            }
            else if (error.response?.status === 401) {
                setErrorMessage('Not found !');
            }
            else if (error.response?.status === 409) {
                setErrorMessage('This specific quote already exists');
            }
            else if (error.response?.status === 500) {
                setErrorMessage('Something unexpected went wrong');
            }
            else {
                setErrorMessage('Creation of quote failed')
            }
            errorRef.current?.focus();
        });



    }

    return (
        <QuoteAddDialogStyle>
            <div className='background'>
                <div className='dialog-window'>

                    <div className='title'>
                        <h1>Are you feeling <span className='text-orange'>inspired?</span></h1>
                        <p>You can post one quote. You can delete it on your profile or edit in this window.</p>
                    </div>

                    <div className='body'>
                        <form onSubmit={handleSubmitAddQuote}>
                            <div className="add-quote-content">
                                <p id="pwdnote">
                                    <FontAwesomeIcon icon={faInfoCircle} /> 300 characters max.
                                </p>
                                <textarea id="content" className="input-add-quote" /*ref={contentRef}*/
                                    autoComplete="off" required onChange={(e) => setContent(e.target.value)}
                                    onFocus={() => setContentFocus(true)} onBlur={() => setContentFocus(false)} />

                            </div>
                            <div className='footer'>
                                <button className='btn small bckgrd-orange bord-none text-white' >Submit</button>
                                <button className='btn small bckgrd-white bord-orange text-orange' onClick={() => setOpenPopup(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div className="ErrorMessage">
                        <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</p>
                    </div>



                </div>
            </div>
        </QuoteAddDialogStyle>
    )
}

export default QuoteAddDialog