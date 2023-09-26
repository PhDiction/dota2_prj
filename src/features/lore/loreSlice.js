import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHeroLore = createAsyncThunk(
  'lore/fetchHeroLore',
  async () => {
    const response = await fetch(`https://api.opendota.com/api/constants/hero_lore`);
    const data = response.json();
    return data;
  }
)


const loreSlice = createSlice({
  name: 'lore',
  initialState: {
    lore: {},
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroLore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroLore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lore = action.payload;
      })
      .addCase(fetchHeroLore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default loreSlice.reducer;