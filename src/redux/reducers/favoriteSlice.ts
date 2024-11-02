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
      // .addCase(deleteProduct.fulfilled, state => {
      //   state.cards = [];
      // })
      // .addCase(fetchFavoriteCards.pending, state => {
      //   state.loading = true;
      // })
      // .addCase(fetchFavoriteCards.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.cards = action.payload;
      // })
      // .addCase(fetchFavoriteCards.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Unknown error';
      // });

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
        console.log('herer state.favoriteCards', state.favoriteCards);
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export default favoriteCardsSlice.reducer;
