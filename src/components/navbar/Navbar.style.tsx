import styled from 'styled-components/macro';

export const NavbarStyle = styled.div`

.navbar {
    /* Navbar size */
    height: 120px;

    /* Inside margins and padding */
    padding-top: 10px;

    
    overflow: hidden;
    justify-content: center;

    ul {
        display: flex;
        list-style-type: none;
    }
    
    button {
        margin-right: 20px;
    }
}

.navbar-container {
    max-width: 1750px;
    height: 120px;
    margin: 0 auto;
    overflow: auto;
    padding: 0 40px;

    //Flex styles:
    display: flex;
    justify-content: space-between;
    align-items: center;


    .navbar-logo {
        width: 12%;
        max-width: 150px;
        min-width: 150px;
    }

    .navbar-profile {
        width: 12%;
        max-width: 50px ;
        min-width: 50px;
    }

    .user-greeting {
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 14px;
        letter-spacing: 0.4px;

        p {
            text-align: center;
            padding-top: 10px;
        }
    }
}

.navbar-add {
        width: 12%;
        max-width: 62px ;
        min-width: 62px;
        padding-left: 20px;
    }

.btn-log{
    font-weight: 400;
    font-size: 20px;
    line-height: 19px;
    color: #e59967;
    background: none;
	border: 0;
	cursor: pointer;
	outline: inherit;

    /* border-bottom: 1px solid black; */
    :hover {
        border-bottom: 2px solid #e59967; 
    }

    :active {
        color: #e59967;
        box-shadow: none;
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
`;