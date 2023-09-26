import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const response = await fetch('https://api.opendota.com/api/constants/heroes');
  const data = await response.json();
  return data;
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: { heroes: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default heroesSlice.reducer;
