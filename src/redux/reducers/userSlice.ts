import {fetchUserData} from '../action/userAction';
import {createSlice} from '@reduxjs/toolkit';
import {UserData} from '../../types/userData';

interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        console.log('action', action.payload);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default userSlice.reducer;
