import React, { useState } from "react";
import NameScreen from "./components/NameScreen";
import GameScreen from "./components/GameScreen";
import HighScores from "./components/HighScores";

const App = () => {
  const [screen, setScreen] = useState("name");
  const [username, setUsername] = useState(""); // Keep track of username

  // Function to start the game
  const onStart = (name) => {
    if (name.trim()) {
      setUsername(name);  // Set the username when it's valid
      setScreen("game");  // Switch to the game screen
    }
  };

  return (
    <>
      {screen === "name" && <NameScreen onStart={onStart} />}
      {screen === "game" && <GameScreen username={username} onFinish={() => setScreen("highscores")} />}
      {screen === "highscores" && <HighScores onRestart={() => setScreen("name")} />}
    </>
  );
};

export default App;
