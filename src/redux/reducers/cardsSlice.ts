import {
  getDataFirebase,
  createNewCard,
  deleteCard,
} from '../action/cardsAction';
import {createSlice} from '@reduxjs/toolkit';
import {Product} from '../../types/product';

interface Card {
  cards: Product[];
  uniqueCategories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: Card = {
  cards: [],
  uniqueCategories: [],
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
        console.log('herer id ', action.payload.id);
        state.uniqueCategories = [
          ...new Set(action.payload.map((card: Product) => card.category)),
        ] as string[];
      })
      .addCase(getDataFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewCard.pending, state => {
        state.loading = true;
      })
      .addCase(createNewCard.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createNewCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCard.pending, state => {
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter(card => card.id !== action.payload);
      })
      .addCase(deleteCard.rejected, state => {
        state.loading = false;
      });
  },
});

export default cardSlice.reducer;
