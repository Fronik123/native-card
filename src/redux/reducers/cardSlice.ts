import {fetchProducts, saveProduct, deleteProduct} from '../action/cardAction';
import {createSlice} from '@reduxjs/toolkit';
import {Product} from '../../types/product';

interface Card {
  card: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: Card = {
  card: [],
  loading: false,
  error: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.card = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'errors';
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        state.card = action.payload;
      })
      .addCase(deleteProduct.fulfilled, state => {
        state.card = [];
      });
  },
});

export default cardSlice.reducer;
