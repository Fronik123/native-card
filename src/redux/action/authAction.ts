import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {NewUserData} from '../../types/userData';

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
      return {email: userCredential.user.email};
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        return rejectWithValue({email: 'Invalid email format'});
      } else if (error.code === 'auth/user-not-found') {
        return rejectWithValue({email: 'User not found'});
      } else if (error.code === 'auth/wrong-password') {
        return rejectWithValue({password: 'Incorrect password'});
      } else {
        return rejectWithValue('Error signing in. \n Try again.');
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    {email, password, phone, surname, name, img = ''}: NewUserData,
    {rejectWithValue},
  ) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore().collection('users').doc(userCredential.user.uid).set({
        img,
        name,
        email,
        phone,
        surname,
      });

      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({email, phone, surname}),
      );

      return {email, phone, surname};
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return rejectWithValue({email: 'Email already in use'});
      } else {
        return rejectWithValue('Registration error. Try again.');
      }
    }
  },
);
