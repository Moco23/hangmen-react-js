import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quote: '',
  maskedQuote: '',
  errors: 0,
  maxErrors: 6,
  username: '', // Add username to the initial state
  // other state properties
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    revealLetter: (state, action) => {
      const { letter } = action.payload;
      let newMaskedQuote = '';
      for (let i = 0; i < state.quote.length; i++) {
        if (state.quote[i] === letter) {
          newMaskedQuote += letter;
        } else {
          newMaskedQuote += state.maskedQuote[i];
        }
      }
      state.maskedQuote = newMaskedQuote;
    },
    incrementErrors: (state) => {
      state.errors += 1;
    },
    resetGame: (state) => {
      state.errors = 0;
      state.maskedQuote = '';
      state.quote = '';
      state.username = '';
      // Reset other state properties as needed
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { revealLetter, incrementErrors, resetGame, setUsername } = gameSlice.actions;
export default gameSlice.reducer;