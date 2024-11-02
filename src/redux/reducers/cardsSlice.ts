import {
  fetchProducts,
  saveProduct,
  deleteProduct,
  getDataFirebase,
} from '../action/cardsAction';
import {createSlice} from '@reduxjs/toolkit';
import {Product} from '../../types/product';

interface Card {
  cards: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: Card = {
  cards: [],
  loading: false,
  error: null as string | null,
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(fetchProducts.pending, state => {
      //   state.loading = true;
      // })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.card = action.payload;
      // })
      // .addCase(fetchProducts.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'errors';
      // })
      // .addCase(saveProduct.fulfilled, (state, action) => {
      //   state.cards = action.payload;
      // })
      // .addCase(deleteProduct.fulfilled, state => {
      //   state.cards = [];
      // })
      .addCase(getDataFirebase.pending, state => {
        state.loading = true;
      })
      .addCase(getDataFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(getDataFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default cardSlice.reducer;
