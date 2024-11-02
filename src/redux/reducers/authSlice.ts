import {loginUser} from '../action/authAction.ts';
import {createSlice} from '@reduxjs/toolkit';
// import User from '@react-native-firebase/auth';
// import {User as FirebaseUser} from '@react-native-firebase/auth';
//don't working
export type User = {
  email: string | null;
  password: string;
};

interface AuthState {
  user: null | User;
  loginTest: boolean;
  loading: boolean;
  error: string | null;
}
//don't working
const initialState: AuthState = {
  user: null,
  loginTest: false,
  loading: false,
  error: null,
};
//don't working
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    loginTestChange: (state, action) => {
      state.loginTest = action.payload;
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
        console.log('herer password?: string;', action.payload);
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const {loadUser, loginTestChange} = authSlice.actions;
export default authSlice.reducer;
//don't working
