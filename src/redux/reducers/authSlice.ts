import {loginUser} from '../action/authAction.ts';
import {createSlice} from '@reduxjs/toolkit';
// export type User = {
//   email: string;
// };

interface AuthState {
  user: {email: string | null} | null;
  loginTest: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loginTest: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(registerUser.pending, state => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(registerUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      // })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const {logout} = authSlice.actions;
export default authSlice.reducer;
