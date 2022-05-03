import styled from 'styled-components';
export const FooterStyle = styled.div`


.footer {
    /* Footer size  */
    height: 56px;
    max-width: 1950px;

    /* Footer style */
    background: linear-gradient(257.39deg, #EFB467 0%, #DE8667 100%);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 32px 32px 0px 0px;

    /* Inside padding and margins */
    margin: 0 auto;
    overflow: auto;
    padding: 0 50px;

    //Flex styles:
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0px;

    p {
        /* Font stye */
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #FFFFFF;
    }

     img {
        /* Logo style */
        width: 12%;
        max-width: 30px;
        min-width: 30px;   
    }
}
`;