import styled from 'styled-components/macro';

export const MasonryGridStyle = styled.div`

.masonry {
    max-width: 1500px;
    margin: 0 auto;
    display: flex;
    width: 70%;

    padding-bottom: 2em;
}

/* pagination style */
.pagination {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    list-style: none;
    margin-top: 20px;

    /* Removal of the:
    To disable the text selection when the user double clicks on the HTML element,
    you can use the user-select property and set its value to none in CSS.
    https://melvingeorge.me/blog/disable-double-click-text-selection-css
    */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.pagination {

}

.quote-masonry-greid {
    padding-top: 20px;
    

}

.pagination a {
        padding: 10px;
        margin: 5px;

        background: #FFFFFF;    
        border-bottom: 1px solid; 
        cursor: pointer;    
    }

.pagination-buttons-active {
        color: #e59967;
        font-weight: bold;  
    }

    .no-quotes {
        text-align: center;
    }


`;