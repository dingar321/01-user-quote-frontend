import styled from 'styled-components/macro';

export const ProfileNameChangeDialogStyle = styled.div`


.background {
    width: 100vw;
    height: 100px;
    position: fixed;
    display: flex;
    justify-content: center;
    padding-top: 20px;

}

.dialog-window {
    /* Window size */
    width: 600px;
    height: 320px;

    /* Window style */
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 16px;

    //Inside content padding
    padding:  40px;

    /* Grid settings */
    display: grid;
    grid-template-rows: 1fr 100px 1fr;

    .title {
        padding-bottom: 20px;
        h1 {
            font-style: normal;
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
        }
    }

    .middle {
        display: flex;
        justify-content: center;

        label {
            padding-bottom: 5px;
            font-weight: bold;
            font-size: 15px;
            line-height: 14px;
        }
    }

    .footer {
        padding-top: 10px;
        margin-bottom: 30px;
        display: grid;
        grid-template-columns: 0.45fr 1fr;
        gap: 1px;
    } 
}




.ErrorMessage {
    color: red;
    font-weight: bold;
    padding-top: 9px;
}



`;