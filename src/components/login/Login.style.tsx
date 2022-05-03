import styled from 'styled-components/macro';

export const LoginStyle = styled.div`


.login-container {
    max-width: 420px;
    margin: 0 auto;
}
        
/* Aligning items to the center */
.login-form-button-submit, .login-header {
    text-align: center;
}

/* Header */
.login-header {
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

/* Form */
.login-form > form > div {
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




.ErrorMessage {
    color: red;
    font-weight: bold;
}

`