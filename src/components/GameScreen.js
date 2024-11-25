import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { revealLetter, incrementErrors, resetGame, setQuote } from "../redux/slices/gameSlice";
import { calculateSmarterScore } from "../utils/scoring"; 
import useQuote from "../hooks/useQuote";  // Import useQuote hook
import Keyboard from "./Keyboard";  // Correct import path

const GameScreen = ({ username, onFinish }) => {
  const { quote, maskedQuote, errors, maxErrors, remainingLetters } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Map());
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

    const newGuessedLetters = new Map(guessedLetters);
    newGuessedLetters.set(letter.toLowerCase(), "incorrect");

    // Check if the quote is correct
    if (quote.toLowerCase().includes(letter.toLowerCase())) {
      dispatch(revealLetter({ letter }));
      setFeedback("Correct!");
      newGuessedLetters.set(letter.toLowerCase(), "correct");
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

    setGuessedLetters(newGuessedLetters);
  };

  useEffect(() => {
    const startTime = Date.now();
    return () => setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
  }, []);

  useEffect(() => {
    if (status === "success") {
      // Set the quote in the Redux store when successfully fetched
      dispatch(setQuote(quoteData));
      console.log("Dohvaćeni citat:", quoteData);
    }
  }, [quoteData, status, dispatch]);

  const handleReset = () => {
    dispatch(resetGame());
    // Fetch a new quote
    window.location.reload();
  };

  return (
    <div className="game-screen">
      {status === "pending" && <p>Loading quote...</p>}
      {status === "error" && <p>Error: {error}</p>}
      {status === "success" && (
        <>
          <p>{maskedQuote}</p>
          <p>Failed try: {errors}/{maxErrors}</p>
          <p>Letters to guess: {remainingLetters}</p> {/* Display the number of letters to guess */}
          <input type="text" maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
          <p className={feedback === "Correct!" ? "correct" : feedback === "Incorrect!" ? "incorrect" : "already-guessed"}>{feedback}</p>
          <button onClick={handleReset}>Restart</button>
          <div>
            <h4>Guessed letters:</h4>
            <p>{[...guessedLetters.keys()].join(", ")}</p>
          </div>
          <div>
            <h4>Player: {username}</h4>
          </div>
          <Keyboard onKeyPress={handleGuess} guessedLetters={guessedLetters} />
        </>
      )}
    </div>
  );
};

export default GameScreen;