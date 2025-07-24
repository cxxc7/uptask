import { createSlice } from '@reduxjs/toolkit';

const theme = localStorage.getItem('theme') || 'light';
const initialState = {
  filter: 'all',
  theme,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setFilter, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
