import {
  fetchFavoriteCards,
  toggleFavorite,
} from '../action/favoriteCardsAction';
import {createSlice} from '@reduxjs/toolkit';
import {Favorites} from '../../types/favorites';

const initialState: Favorites = {
  favoriteCards: [],
  loading: false,
  error: null,
};

export const favoriteCardsSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavoriteCards.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFavoriteCards.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteCards = action.payload;
      })
      .addCase(fetchFavoriteCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favoriteCards = action.payload;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default favoriteCardsSlice.reducer;
