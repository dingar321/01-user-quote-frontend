import styled from 'styled-components';
export const NavbarStyle = styled.div`

.navbar {
    height: 120px;
    padding-top: 30px;
    overflow: hidden;
    justify-content: center;

     ul {
        display: flex;
    }

    button{
        margin-right: 10px;
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

}

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

/* btn styles for logged in scenario */
.navbar-add {
    width: 12%;
    max-width: 62px ;
    min-width: 62px;
    padding-left: 20px;
}

/* btn styles for logged in scenario */
.btn-log{
    font-weight: 400;
    font-size: 20px;
    line-height: 19px;
    color: black;
    background: none;
	border: 0;
	cursor: pointer;
	outline: inherit;
}


ul {
    list-style-type: none;
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



/* For the dialog backgeround */
.dialog-background {
    width: 100vw;
    height: 1080px;
    backdrop-filter: blur(3px);
    position: fixed;
}
`;