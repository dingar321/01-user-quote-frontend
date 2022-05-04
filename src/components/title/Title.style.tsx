import styled from 'styled-components/macro';

export const TitleStyle = styled.div`

.title {
    text-align: center;
    h1 {
        @media (max-width: 500px) {
            padding-left: 10%;

            margin: 0;
        }
        font-weight: 400;
        font-size: 35px;
        line-height: 41px;
        letter-spacing: 0.25px;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        width: 600px;

        @media (max-width: 500px) {
            padding-left: 10%;
            width: 500px;
            margin: 0;
        }

    }

    .title-description {

        display: flex;
        justify-content: space-around;

    }

}

`