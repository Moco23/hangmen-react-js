/**
 * `calculateScore` function calculates the score for the game based on the number of errors,
 * unique characters in the quote, quote length, and duration.
 * 
 * Formula used:
 * - Fewer errors lead to a higher score.
 * - More unique letters in the quote increase the score.
 * - Longer quotes are more difficult and thus scored higher.
 * - Faster solutions get a higher score (penalizes longer solving times).
 * 
 * @param {number} errors - The number of incorrect guesses.
 * @param {number} uniqueCharacters - The number of unique characters in the quote.
 * @param {number} length - The length of the quote.
 * @param {number} duration - The time it took to finish the game (in milliseconds).
 * @returns {number} - The calculated score.
 */

export const calculateScore = (errors, uniqueCharacters, length, duration) => {
  const baseScore = 100 / (1 + errors); // Base score reduces with more errors
  const uniqueMultiplier = uniqueCharacters / 10; // Reward for unique letters
  const lengthMultiplier = length / 20; // Reward for longer quotes
  const timePenalty = Math.max(1, duration / 60000); // Time penalty (1+ minutes)

  return Math.round(baseScore * (uniqueMultiplier + lengthMultiplier) / timePenalty);
};
