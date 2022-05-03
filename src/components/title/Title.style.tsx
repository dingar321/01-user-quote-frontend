import styled from 'styled-components/macro';

export const TitleStyle = styled.div`

.title {
    text-align: center;
    background-color: green;
    h1 {
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
            width: 300px;
            margin: 0;
            background-color: aquamarine;
        }

    }

    .title-description {
        background-color: red;

        display: flex;
        justify-content: space-around;

    }

}

`