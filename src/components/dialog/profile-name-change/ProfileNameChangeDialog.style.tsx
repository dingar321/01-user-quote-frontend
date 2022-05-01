import styled from 'styled-components/macro';

export const ProfileNameChangeDialogStyle = styled.div`

.background {
    /* Background and 
    position on top(layers) of the webpage */
    width: 100vw;
    height: 100px;
    position: fixed;
    display: flex;
    justify-content: center;
    padding-top: 20px;

}


.dialog-window {
    width: 600px;
    height: 400px;
 
    /* Window style */
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 16px;

    //Inside content padding
    padding:  40px;

    .body {
        padding-top: 30px;
        /* Style for the full-name fields (InLine) */
        .signup-form-full-name {
            /* For displaying of the full-name fields in line */
            display: flex;
            justify-content: center;
        }

        .footer {

            padding-top: 80px;
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


`;