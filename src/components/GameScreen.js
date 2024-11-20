import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { revealLetter, incrementErrors, resetGame } from "../redux/slices/gameSlice";

const GameScreen = ({ onFinish }) => {
  const { quote, maskedQuote, errors, maxErrors } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const handleGuess = (letter) => {
    if (quote.toLowerCase().includes(letter.toLowerCase())) {
      dispatch(revealLetter(letter));
    } else {
      dispatch(incrementErrors());
      if (errors + 1 === maxErrors) {
        alert("Game Over!");
        onFinish();
        dispatch(resetGame()); // Reset the game state
      }
    }
  };

  return (
    <div className="game-screen">
      <p>{maskedQuote}</p>
      <p>Errors: {errors}/{maxErrors}</p>
      <input
        type="text"
        maxLength={1}
        onChange={(e) => handleGuess(e.target.value)}
      />
    </div>
  );
};

export default GameScreen;