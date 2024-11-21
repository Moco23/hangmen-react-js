function smarter(L, U, E, T) {
  const maxErrors = 10; // Example: maximum number of errors
  const maxUniqueLetters = 26; // Example: maximum number of unique letters in the alphabet
  const maxQuoteLength = 100; // Example: maximum quote length

  // Score formula (you can modify this based on your requirements)
  let score = (maxErrors - E) * 10 + (U / maxUniqueLetters) * 30 + (L / maxQuoteLength) * 40 - (T / 100) * 20;
  
  return Math.max(0, score); // Ensure score is not negative
}

module.exports = smarter; // Make sure this is exported
