import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculateSmarterScore } from '../utils/scoring';  // Ispravan import funkcije

const HighScores = ({ onRestart }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores")
      .then((response) => {
        const sortedScores = response.data
          .map((score) => ({
            ...score,
            finalScore: calculateSmarterScore(score.length, score.uniqueCharacters, score.errors, score.duration), // Koristi calculateSmarterScore
          }))
          .sort((a, b) => b.finalScore - a.finalScore);

        setScores(sortedScores);
      });
  }, []);

  return (
    <div className="high-scores">
      <h1>High Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.userName}: {score.finalScore}
          </li>
        ))}
      </ul>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default HighScores;
