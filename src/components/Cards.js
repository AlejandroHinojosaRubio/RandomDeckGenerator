import React from 'react';

const Cards = ({ images, cards, cardsData}) => {
    return( 
        <div className="container">
                {cards.map(card => 
                    <div>
                        <img height="220px" width="200px" src={images[cardsData[card].url].default} alt="" />
                    </div>
                    )
                }
        </div>
    )
}

export default Cards; 