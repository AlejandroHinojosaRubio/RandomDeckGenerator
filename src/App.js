import './App.css';
import React, { useState, useEffect } from "react";
//Components && images
import elixir from './img/elixir.png'
import crown from './img/crown.png'
import Deck from './components/Deck';
//JSON card data
import cardsData from './paths.json';

function App() {

  const [cards, setCards] = useState([]);
  const [elixirCosts, setElixirCosts] = useState([]);
  var   cardsIndex    = [];
  var   cardsElixir   = [];
  var   sortArray     = [];
  var   cont          = 0;
  var   avg           = 0; 
  //Importing images
  const importAll = () => {
    let r = require.context('./img/clashRoyale', false, /\.png/);
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll()

  const generateDeck = () => {
    cont        = 0;
    cardsIndex  = [];
    cardsElixir = [];
    for (let i = 0; i < 8; i++) { 
      const x = Math.floor(Math.random() * (cardsData.length));
      cardsIndex.push(x);
    }

    sortArray = cardsIndex.sort()
    for (let e = 0; e < sortArray.length; e++) {
      if (sortArray[e] === sortArray[e+1]){
        cont++;
      }
    }

    if(cont > 0){
      generateDeck()
    }else{
      setCards(cardsIndex);
      calculateElixir()
    }
  }
  
  const calculateElixir = () => {
    cardsIndex.map(card => cardsElixir.push(cardsData[card].elixir));
    let sum = cardsElixir.reduce((previous, current) => current += previous);
    avg = sum / cardsElixir.length;
    setElixirCosts(Math.round(avg * 10) / 10);
  }
  
  useEffect(() => {
    generateDeck();
  }, [])
  return (
    <div className="App">
      <header className="App-header p-5">
        <h1><b>Clash Royale Random Deck</b><img height="100px" width="100px" src={crown} alt="" /></h1>
      </header> 
      <Deck 
        images={images}
        cards={cards}
        cardsData={cardsData}
      />
      <label>{elixirCosts}</label><img src={elixir} className="m-2" alt="" height="50px" width="50px"/>
      <button className="mt-5 button" onClick={generateDeck}>Generate Deck</button>
    </div>
  );
}

export default App;
