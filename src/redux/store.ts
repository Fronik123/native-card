import {configureStore} from '@reduxjs/toolkit';
import cardReducer from './reducers/cardsSlice';
import authReducer from './reducers/authSlice';
import userRedecer from './reducers/userSlice';
import favoriteCardsSlice from './reducers/favoriteSlice';

const store = configureStore({
  reducer: {
    cards: cardReducer,
    auth: authReducer,
    user: userRedecer,
    favorites: favoriteCardsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/checkAuthStatus/fulfilled'],
      },
    }),
});

export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
export default store;
