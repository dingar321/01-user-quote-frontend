import React from 'react'

import { TitleStyle } from './Title.style';

const Title = ({ title, description }: { title: string, description: string }) => {
    return (
        <TitleStyle>
            <div className='title'>
                <h1 className="text-orange">{title}</h1>
                <div className='title-description'>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </TitleStyle >
    )
}

export default Title;