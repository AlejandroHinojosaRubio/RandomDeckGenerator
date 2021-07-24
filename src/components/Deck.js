import React from 'react';
import Cards from './Cards';

const Deck = ({ images, cards, cardsData }) => {
    return(
        <div >
                <Cards
                    images={images}
                    cards={cards}
                    cardsData={cardsData}
                    key={Math.random() * 1000}
                />
        </div>
    )
}

export default Deck;