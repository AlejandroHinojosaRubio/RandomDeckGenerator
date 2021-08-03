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

  //Importing images to webpack
  const importAll = () => {
    let r = require.context('./img/clashRoyale', false, /\.png/);
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll()

  //Function that generate an array with 8 different index ex: [1,5,3,2,8,9,3,4] from 0 to the total cards on the game
  const generateDeck = () => {
    cont        = 0;
    cardsIndex  = [];
    cardsElixir = [];
    //Generate random index numbers
    for (let i = 0; i < 8; i++) { 
      const x = Math.floor(Math.random() * (cardsData.length));
      cardsIndex.push(x);
    }
    //Checks if exists duplicate index, if so, it generate another array
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
  
  //Function that calculate the average cost of elixir (each card has his own elixir cost)
  const calculateElixir = () => {
    cardsIndex.map(card => cardsElixir.push(cardsData[card].elixir));
    let sum = cardsElixir.reduce((previous, current) => current += previous);
    avg = sum / cardsElixir.length;
    setElixirCosts(Math.round(avg * 10) / 10);
  }
  
  //Generate a deck when app load
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
