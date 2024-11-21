import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/slices/gameSlice";

const NameScreen = ({ onStart }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleStart = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    dispatch(setUsername(name.trim()));
    setErrorMessage(""); // Reset error message
    onStart(); // Move to the next screen
  };

  return (
    <div className="name-screen">
      <h1>Welcome to Hangman</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart}>Start Game</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default NameScreen;
