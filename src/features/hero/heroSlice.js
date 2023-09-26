import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchHeroById = createAsyncThunk(
  'hero/fetchById',
  async (heroId) => {
    const response = await fetch(`https://api.opendota.com/api/constants/heroes`);
    const data = await response.json();
    return data;
  }
);

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    hero: {},
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hero = action.payload;
      })
      .addCase(fetchHeroById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default heroSlice.reducer;