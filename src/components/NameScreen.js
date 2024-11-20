import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/slices/gameSlice";

const NameScreen = ({ onStart }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleStart = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    dispatch(setUsername(name.trim()));
    onStart();
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
    </div>
  );
};

export default NameScreen;
