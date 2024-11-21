import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { revealLetter, incrementErrors, resetGame } from "../redux/slices/gameSlice";
import { calculateSmarterScore } from "../utils/scoring"; 
import useQuote from "../hooks/useQuote";  // Import useQuote hook

const GameScreen = ({ username, onFinish }) => {
  const { quote, maskedQuote, errors, maxErrors } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [timeTaken, setTimeTaken] = useState(0);

  const { quoteData, status, error } = useQuote();  // Destructure status and quoteData

  const handleGuess = (letter) => {
    if (!letter || !letter.match(/[a-zA-Z]/)) {
      setFeedback("");
      return;
    }

    if (guessedLetters.has(letter.toLowerCase())) {
      setFeedback("You've already guessed this letter!");
      return;
    }

    setGuessedLetters(new Set(guessedLetters.add(letter.toLowerCase())));

    // Check if the quote is correct
    if (quoteData.toLowerCase().includes(letter.toLowerCase())) {
      dispatch(revealLetter(letter));
      setFeedback("Correct!");
    } else {
      dispatch(incrementErrors());
      setFeedback("Incorrect!");
      if (errors + 1 === maxErrors) {
        alert("Game Over!");
        const score = calculateSmarterScore(quote.length, new Set(quote.replace(/\s/g, '')).size, errors, timeTaken);
        console.log("Your final score:", score);
        onFinish();
        dispatch(resetGame());
      }
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    return () => setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
  }, []);

  useEffect(() => {
    if (status === "success") {
      // Display the quote when successfully fetched
      console.log("Dohvaćeni citat:", quoteData);
    }
  }, [quoteData, status]);

  return (
    <div className="game-screen">
      {status === "pending" && <p>Loading quote...</p>}
      {status === "error" && <p>Error: {error}</p>}
      {status === "success" && (
        <>
          <p>{maskedQuote}</p>
          <p>Failed try: {errors}/{maxErrors}</p>
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
        </>
      )}
    </div>
  );
};

export default GameScreen;
