import styled from 'styled-components/macro';


export const ProfileStyle = styled.div`

.profile {
    max-width: 1500px;
    margin: 0 auto;
    padding: 40px 40px;
}

.user-information {
    text-align: center;
    margin-bottom: 2em;

    .name {
        font-style: normal;
        font-weight: 400;
        font-size: 35px;
        line-height: 41px;
        text-align: center;
        letter-spacing: 0.25px;    
        padding-bottom: 30px;
        justify-content: center;
        display: flex;
    }

    .user-karma {
        display: flex;
        justify-content: center;
    }

    .square {
        background: #FFFFFF;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
        border-radius: 16px;
        width: 214px;
    }

}


.user-quote {
    margin: 0 -200px;
    padding: 50px 0;
        h1 {
            text-align: center;
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 28px;
            color: #DE8667;
        
        }

}

.user-liked-quotes {
    margin: 0 -200px;
    padding-bottom: 5em;
    
    
    h1 {
        text-align: center;
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 28px;
            color: black;
        }
}


.profile-settings{
    padding-top: 20px;

    button {
        margin-left: 15px;
        vertical-align: top;
        font-weight: 200;
        font-size: 12px;
        color: #e59967;
        background: none;
        border: 0;
        cursor: pointer;
        outline: inherit;
        /* border-bottom: 1px solid black; */
        :hover {
            border-bottom: 1px solid #e59967; 
        }
    }
}

/* Dialog background activates when the
dialog is oppened is pressed*/
.dialog-background {
    //Size of the background
    width: 100vw;
    height: 1080px;
    backdrop-filter: blur(3px);
    position: fixed;
}
`