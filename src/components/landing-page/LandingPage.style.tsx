import styled from 'styled-components/macro';

export const LandingPageStyle = styled.div`


.landing-page {
    max-width: 1500px;
    margin: 0 auto;
    padding: 40px 40px;
}

.first-row {
    //Grid styles:
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 10px;

    padding-bottom: 11em;

    .first-row-text {
        h1 {
            font-style: normal;
            font-weight: 300;
            font-size: 98px;
            line-height: 90px;
        }

        p {
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        padding: 1em 0;
        }
    }

    .first-row-card {
        padding-top: 5%;
        padding-left: 20%;
    }
}

.landing-page-middle {
    padding-bottom: 6em;
    h2 {
        font-style: normal;
        font-weight: 300;
        font-size: 61px;
        line-height: 72px;
        text-align: center;
        letter-spacing: -0.5px;
    }
}

.most-recent-quotes, 
.most-upvoted-quote, 
.quote-of-the-day {
    padding-bottom: 5em;
    margin: 0 -200px;
}

.quote-of-the-day {

    .quote-card { 
        display: flex;
        justify-content: center;
    }
}

.title {
}

.no-quotes {
    padding-top: 20px;
        text-align: center;
    }

.loading {
    text-align: center;
}
`;