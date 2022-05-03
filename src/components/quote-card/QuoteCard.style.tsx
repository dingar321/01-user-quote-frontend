import styled from 'styled-components/macro';

export const QuoteCardStyle = styled.div`

/* Tyle for the single quote card */

.masonry-card {

    /* Define a flex so we get every element in line */
    display: flex;

    /* Style to create the card look */
    /* White */
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    /* If we dont define margin only for one side 
    The margin gets doubled in some places */
    margin-left: 20px;
    margin-bottom: 20px;

    /* Padding inside of the card */
    padding: 10px;

    /* Setting the size of the cards */
    max-width: 420px;
    min-height: 130px;

}



.card-upvotes {
    width: 50px;
    margin: 5px;
    text-align: center;
    margin: auto 0;
    padding-left: 10px;
    p {
        text-align: center;
        margin: auto 0;
    }

    img {
        text-align: center;
        margin: auto 0;
        padding: 5px;
        margin-top: 7px;
        width: 20px;
        border: 1px solid;
        border-radius: 15px;
    }

    .downvote {
        border: 1px solid #003f9a;
        background-color: #5099f4;

    }

    .upvote {
        border: 1px solid #ff6700 ;
        background-color: #ff9248;
    }
}




.card-column {

    padding: 10px;
    display: grid;
    grid-template-rows: 20px auto 20px;
    margin-left: 15px;

    .user{
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 14px;
        padding-top: 15px;
    }

    .content{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        padding-top: 20px;
        padding-bottom: 15px;
    }

    .date {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
    }
}

.logged-users-quote {
    color:#e59967;
    font-weight: bold;
}

.quote-user {
    display: inline;
    padding-right: 220px;
}


.delete-button {

	color: #e59967;
        background-color: white;


width: 20px;
height: 20px;
    border-radius: 100px;
    border: 0px solid #e59967;
    font-size: 15px;

    :active {

    }
}


`;