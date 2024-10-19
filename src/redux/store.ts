import {configureStore} from '@reduxjs/toolkit';
import cardReducer from './reducers/cardsSlice';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    cards: cardReducer,
    auth: authReducer,
  },
});

export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
export default store;
