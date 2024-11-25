import React from "react";

const Keyboard = ({ onKeyPress, guessedLetters }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onKeyPress(letter)}
          className={
            guessedLetters.has(letter.toLowerCase())
              ? guessedLetters.get(letter.toLowerCase()) === "correct"
                ? "correct"
                : "incorrect"
              : ""
          }
          disabled={guessedLetters.has(letter.toLowerCase())}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;