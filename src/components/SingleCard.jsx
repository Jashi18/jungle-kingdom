/* eslint-disable react/prop-types */
import "./singleCard.css";
import cover from "../img/cover.png";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  function handleClick() {
    if (!disabled) {
      handleChoice(card);
    }
  }
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} />
        <img className="back" src={cover} onClick={handleClick} />
      </div>
    </div>
  );
}

export default SingleCard;
