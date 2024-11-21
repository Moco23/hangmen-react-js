import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { revealLetter, incrementErrors, resetGame } from "../redux/slices/gameSlice";

const GameScreen = ({ username, onFinish }) => { // Accepting username as prop
  const { quote, maskedQuote, errors, maxErrors } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState(""); // To show feedback message to the user
  const [guessedLetters, setGuessedLetters] = useState(new Set()); // To track guessed letters

  const handleGuess = (letter) => {
    // If the user presses backspace or an invalid key, don't change feedback
    if (!letter || !letter.match(/[a-zA-Z]/)) {
      setFeedback(""); // Do not show anything for backspace or empty input
      return;
    }

    // Check if the user has already guessed this letter
    if (guessedLetters.has(letter.toLowerCase())) {
      setFeedback("You've already guessed this letter!");
      return;
    }

    // Add the letter to the guessed set
    setGuessedLetters(new Set(guessedLetters.add(letter.toLowerCase())));

    // Check if the letter is in the quote
    if (quote.toLowerCase().includes(letter.toLowerCase())) {
      dispatch(revealLetter(letter));
      setFeedback("Correct!");
    } else {
      dispatch(incrementErrors());
      setFeedback("Incorrect!");
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
      <p className={feedback === "Correct!" ? "correct" : feedback === "Incorrect!" ? "incorrect" : "already-guessed"}>{feedback}</p> {/* Show feedback message */}
      <button onClick={() => dispatch(resetGame())}>Restart</button>
      <div>
        <h4>Guessed letters:</h4>
        <p>{[...guessedLetters].join(", ")}</p> {/* Display guessed letters */}
      </div>

      {/* Display the username in the game screen */}
      <div>
        <h4>Player: {username}</h4>
      </div>
    </div>
  );
};

export default GameScreen;
