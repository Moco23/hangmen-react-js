export const calculateScore = (errors, uniqueCharacters, length, duration) => {
  const baseScore = 100 / (1 + errors); // Base score reduces with more errors
  const uniqueMultiplier = uniqueCharacters / 10; // Reward for unique letters
  const lengthMultiplier = length / 20; // Reward for longer quotes
  const timePenalty = Math.max(1, duration / 60000); // Time penalty (1+ minutes)

  return Math.round(baseScore * (uniqueMultiplier + lengthMultiplier) / timePenalty);
};
