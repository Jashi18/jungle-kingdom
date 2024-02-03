import { useEffect, useState } from "react";
import "./App.css";
import cat from "./img/cat.png";
import cow from "./img/cow.png";
import fox from "./img/fox.png";
import lion from "./img/lion.png";
import owl from "./img/owl.png";
import parrot from "./img/parrot.png";
import cover from "./img/cover.png";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: cat, matched: false },
  { src: cow, matched: false },
  { src: fox, matched: false },
  { src: lion, matched: false },
  { src: owl, matched: false },
  { src: parrot, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choceOne, setChoiceOne] = useState(null);
  const [choceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffeledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffeledCards);
    setTurns(0);
  };

  function handleChoice(card) {
    choceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if (choceOne && choceTwo) {
      setDisabled(true);
      if (choceOne.src === choceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  }, [choceOne, choceTwo]);

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevtTurns) => prevtTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Jungle Kingdom</h1>
      <button onClick={shuffleCards}>NEW GAME !</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            cover={cover}
            handleChoice={handleChoice}
            flipped={card === choceOne || card === choceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
