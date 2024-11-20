import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  quote: "",
  maskedQuote: "",
  uniqueCharacters: new Set(),
  errors: 0,
  maxErrors: 6,
  startTime: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    startGame: (state, action) => {
      state.quote = action.payload.quote;
      state.maskedQuote = action.payload.quote.replace(/[a-zA-Z]/g, "_");
      state.uniqueCharacters = new Set(action.payload.quote.toLowerCase().match(/[a-z]/g));
      state.errors = 0;
      state.startTime = Date.now();
    },
    revealLetter: (state, action) => {
      const letter = action.payload.toLowerCase();
      const updatedMaskedQuote = state.maskedQuote.split("").map((char, idx) =>
        state.quote[idx].toLowerCase() === letter ? state.quote[idx] : char
      );
      state.maskedQuote = updatedMaskedQuote.join("");
    },
    incrementErrors: (state) => {
      state.errors++;
    },
    resetGame: (state) => {
      state.username = "";
      state.quote = "";
      state.maskedQuote = "";
      state.uniqueCharacters = new Set();
      state.errors = 0;
      state.startTime = null;
    },
  },
});

export const { setUsername, startGame, revealLetter, incrementErrors, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
