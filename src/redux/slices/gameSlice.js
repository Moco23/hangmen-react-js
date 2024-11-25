import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quote: '',
  maskedQuote: '',
  errors: 0,
  maxErrors: 6,
  username: '',
  remainingLetters: 0, // Add remainingLetters to the initial state
  // other state properties
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setQuote: (state, action) => {
      state.quote = action.payload;
      state.maskedQuote = action.payload.replace(/[a-zA-Z]/g, '_');
      state.remainingLetters = action.payload.replace(/\s/g, '').length; // Initialize remainingLetters
    },
    revealLetter: (state, action) => {
      const { letter } = action.payload;
      let newMaskedQuote = '';
      let lettersRevealed = 0;
      for (let i = 0; i < state.quote.length; i++) {
        if (state.quote[i].toLowerCase() === letter.toLowerCase()) {
          newMaskedQuote += state.quote[i];
          lettersRevealed++;
        } else {
          newMaskedQuote += state.maskedQuote[i];
        }
      }
      state.maskedQuote = newMaskedQuote;
      state.remainingLetters -= lettersRevealed; // Update remainingLetters
    },
    incrementErrors: (state) => {
      state.errors += 1;
    },
    resetGame: (state) => {
      state.errors = 0;
      state.maskedQuote = '';
      state.quote = '';
      state.username = '';
      state.remainingLetters = 0; // Reset remainingLetters
      // Reset other state properties as needed
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setQuote, revealLetter, incrementErrors, resetGame, setUsername } = gameSlice.actions;
export default gameSlice.reducer;