import React from 'react'

//Style imports
import { FooterStyle } from './FooterStyle'

//Image imports
import FooterLogo from '../../assets/images/footer/footer-logo.svg';

const Footer = () => {
    return (
        <FooterStyle>
            <footer className="footer">
                <div className="footer-container">
                    <h1>
                        <img src={FooterLogo} />
                    </h1>
                    <div>
                        <p>All Rights Reserved | skillupmentor.com</p>
                    </div>
                </div>
            </footer>
        </FooterStyle>
    )
}

export default Footer