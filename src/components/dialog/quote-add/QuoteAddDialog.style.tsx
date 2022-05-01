import styled from 'styled-components/macro';

export const QuoteAddDialogStyle = styled.div`

.background {
    /* Background and 
    position on top(layers) of the webpage */
    width: 100vw;
    height: auto;
    position: fixed;
    display: flex;
    justify-content: center;
    padding-top: 20px;
}

.dialog-window {
    width: 600px;
    height: 450px;

    /* Window style */
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 16px;

    //Inside content padding
    padding:  40px;

    .body {
        padding-top: 30px;
        .input-add-quote {
            /* Input border style  */
            background: #FFFFFF;
            border: 2px solid #DE8667;
            border-radius: 16px;

            /* Input size and inside padding */
            width: 529px;
            height: 150px;
            padding: 16px 24px;box-sizing: border-box;


            /* Font style inside */
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            resize: none;
        }

        .footer {
            padding-top: 20px;
            display: grid;
            grid-template-columns: 0.45fr 1fr;
            gap: 1px;

        }
    }       
}



.ErrorMessage {
    color: red;
    font-weight: bold;
    padding-top: 9px;
}



`