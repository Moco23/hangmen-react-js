import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/slices/gameSlice";

const NameScreen = ({ onStart }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleStart = () => {
    if (name.trim()) {
      dispatch(setUsername(name));
      onStart(name);
    } else {
      setErrorMessage("Please enter your name.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleStart();
    }
  };

  return (
    <div className="name-screen">
      <h1>Welcome to Hangman Game</h1>
      <p>Enter your name to start the game:</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleStart}>Start Game</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="game-description">
        <h2>How to Play</h2>
        <p>
          Welcome to the Hangman Game! The objective of the game is to guess the
          hidden quote by guessing one letter at a time. You have a limited
          number of incorrect guesses, so choose your letters wisely. If you
          guess a letter correctly, it will be revealed in the quote. If you
          guess incorrectly, you will lose a chance. The game ends when you
          either guess the entire quote correctly or run out of chances. Good
          luck!
        </p>
      </div>
    </div>
  );
};

export default NameScreen;