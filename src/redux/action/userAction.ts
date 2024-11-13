import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserData, UpdateUser} from '../../types/userData';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const user = auth().currentUser;

    if (user) {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const data = userDoc.data();

        const allData = {
          id: userDoc.id,
          img: data?.img || '',
          name: data?.name || '',
          surname: data?.surname || '',
          phone: data?.phone || '',
          email: data?.email || '',
        };

        return allData as UserData;
      }
    }
    return null;
  },
);

export const updateUserData = createAsyncThunk<UserData, UpdateUser>(
  'user/updateUserData',
  async ({userId, newData}, thunkAPI) => {
    try {
      await firestore().collection('users').doc(userId).update(newData);
      return newData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
