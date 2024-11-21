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
    dispatch(setUsername(name.trim()));  // This will store the username in Redux
    setErrorMessage("");  // Reset error message
    onStart(name);  // Call onStart to switch screen
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleStart();  // Trigger game start when Enter is pressed
    }
  };

  return (
    <div className="name-screen">
      <h1>Welcome to Hangman</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress} // Listen for Enter key press
      />
      <button onClick={handleStart}>Start Game</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default NameScreen;
