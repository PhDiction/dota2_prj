import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../features/herolist/heroesSlice.js'
import heroReducer from '../features/hero/heroSlice.js'
import loreReducer from '../features/lore/loreSlice.js'

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    hero: heroReducer,
    lore: loreReducer
  },
});
