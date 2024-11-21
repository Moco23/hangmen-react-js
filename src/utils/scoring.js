// src/utils/scoring.js

export const calculateSmarterScore = (L, U, E, T) => {
  // Define base score for fewer errors, penalize with more errors
  const baseScore = 100 / (1 + E);  // Fewer errors = higher base score

  // Reward for unique characters (U)
  const uniqueMultiplier = Math.log(U + 1);  // More unique letters = higher multiplier

  // Reward for longer quotes (L)
  const lengthMultiplier = Math.log(L + 1);  // Longer quotes = higher multiplier

  // Penalize slower times (T), time is in seconds so divide by 60 to avoid huge numbers
  const timePenalty = Math.max(1, Math.log(T / 60 + 1)); // Longer times = bigger penalty

  // The final score is calculated by multiplying the factors and dividing by the time penalty
  const finalScore = Math.round(baseScore * uniqueMultiplier * lengthMultiplier / timePenalty);

  return finalScore;
};
