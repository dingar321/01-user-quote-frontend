import styled from 'styled-components/macro';

export const SignupStyle = styled.section`


/* Header */
.signup-header {

    /* Font styles for the header */
    h1 {
        font-weight: 400;
        font-size: 35px;
        line-height: 41px;
        letter-spacing: 0.25px; 
    }

    /* Font styles for the top paragraph */
    p {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }

} 

     /* Main container */
     .signup-container {
        max-width: 420px;
        margin: 0 auto;
    }
        
    /* Aligning items to the center */
    .signup-form-button-submit, .signup-header, 
    .signup-image, .signup-href-grid {
        text-align: center;
    }

    /* Space for bottom of the image and*/
    .signup-image {
        margin-bottom: -30px;
    }

/* Form */
.signup-form > form > div {
    /* Space top/bottom of the input fields */
    padding: 5px 0;

    input {
        display:block;
        margin:0 auto;
    }
    
    /* Font styles for the input labels */
    label {
        padding-bottom: 5px;
        font-weight: bold;
        font-size: 15px;
        line-height: 14px;
    }
}

/* Style for the full-name fields (InLine) */
.signup-form-full-name {
    /* For displaying of the full-name fields in line */
    display: flex;
    justify-content: center;

    /* Space between the full name inputs */
    div {
        margin: 0 20px;
    }
}

/* Href */
.login-href-grid {
    display: flex;
    justify-content: space-between;

    a {
        cursor: pointer;
    }
}

/* Background vector: */
.auth-vector-bckgrd {
    position: absolute;
    z-index: -1;
    width: 763px;
    height: 572px;
    left: 0;
    top: 33.50%;
}

.ErrorMessage {
    color: red;
    font-weight: bold;
}

#pwdnote {
    padding-top: 10px;
}

`;