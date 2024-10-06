import {configureStore} from '@reduxjs/toolkit';
import cardReducer from './reducers/cardSlice';

const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
export default store;
