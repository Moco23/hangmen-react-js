import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { revealLetter, incrementErrors, resetGame } from "../redux/slices/gameSlice";
import { calculateSmarterScore } from "../utils/scoring";  // Import the smarter score function

const GameScreen = ({ username, onFinish }) => { // Accepting username as prop
  const { quote, maskedQuote, errors, maxErrors } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState(""); // To show feedback message to the user
  const [guessedLetters, setGuessedLetters] = useState(new Set()); // To track guessed letters
  const [timeTaken, setTimeTaken] = useState(0);  // To store the time taken

  const handleGuess = (letter) => {
    if (!letter || !letter.match(/[a-zA-Z]/)) {
      setFeedback(""); // Do not show anything for backspace or empty input
      return;
    }

    if (guessedLetters.has(letter.toLowerCase())) {
      setFeedback("You've already guessed this letter!");
      return;
    }

    setGuessedLetters(new Set(guessedLetters.add(letter.toLowerCase())));

    if (quote.toLowerCase().includes(letter.toLowerCase())) {
      dispatch(revealLetter(letter));
      setFeedback("Correct!");
    } else {
      dispatch(incrementErrors());
      setFeedback("Incorrect!");
      if (errors + 1 === maxErrors) {
        alert("Game Over!");
        // Calculate smarter score when game ends
        const score = calculateSmarterScore(quote.length, new Set(quote.replace(/\s/g, '')).size, errors, timeTaken);
        console.log("Your final score:", score);  // Log the score (can be sent to the server)
        onFinish();
        dispatch(resetGame());
      }
    }
  };

  useEffect(() => {
    const startTime = Date.now();  // Store the start time when game begins
    return () => setTimeTaken(Math.floor((Date.now() - startTime) / 1000));  // Calculate time when game finishes
  }, []);

  return (
    <div className="game-screen">
      <p>{maskedQuote}</p>
      <p>Errors: {errors}/{maxErrors}</p>
      <input type="text" maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
      <p className={feedback === "Correct!" ? "correct" : feedback === "Incorrect!" ? "incorrect" : "already-guessed"}>{feedback}</p>
      <button onClick={() => dispatch(resetGame())}>Restart</button>
      <div>
        <h4>Guessed letters:</h4>
        <p>{[...guessedLetters].join(", ")}</p>
      </div>
      <div>
        <h4>Player: {username}</h4>
      </div>
    </div>
  );
};

export default GameScreen;
