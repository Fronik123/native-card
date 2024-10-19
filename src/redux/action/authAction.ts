import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
//don't working
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      await AsyncStorage.setItem('auth', JSON.stringify(userCredential.user));
      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
//don't working
