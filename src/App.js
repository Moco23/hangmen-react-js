import React, { useState } from "react";
import NameScreen from "./components/NameScreen";
import GameScreen from "./components/GameScreen";
import HighScores from "./components/HighScores";

const App = () => {
  const [screen, setScreen] = useState("name");

  return (
    <>
      {screen === "name" && <NameScreen onStart={() => setScreen("game")} />}
      {screen === "game" && <GameScreen onFinish={() => setScreen("highscores")} />}
      {screen === "highscores" && <HighScores onRestart={() => setScreen("name")} />}
    </>
  );
};

export default App;
