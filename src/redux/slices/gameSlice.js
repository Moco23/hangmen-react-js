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
      // logic to reveal letter
    },
    incrementErrors: (state) => {
      state.errors += 1;
    },
    resetGame: (state) => {
      state.errors = 0;
      state.maskedQuote = ''; // Reset other state properties as needed
      // Reset other state properties as needed
    },
    setUsername: (state, action) => {
      state.username = action.payload; // Add setUsername reducer
    },
  },
});

export const { revealLetter, incrementErrors, resetGame, setUsername } = gameSlice.actions;
export default gameSlice.reducer;