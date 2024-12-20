import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product, NewProduct} from '../../types/product';

//firebasestore
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/app';

export const getDataFirebase = createAsyncThunk(
  'cards/fetchCards',
  async (_, {rejectWithValue}) => {
    try {
      const cachedProducts = await AsyncStorage.getItem('cards');
      if (cachedProducts) {
        // Если кэшированные данные есть, возвращаем их
        return JSON.parse(cachedProducts);
      }

      const productsSnapshot = await firestore()
        .collection('cards')
        .orderBy('createdAt', 'desc')
        .get();
      const cards = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        image: doc.data().img,
        description: doc.data().description,
        price: doc.data().price,
        isUsed: doc.data().isUsed,
        category: doc.data().category,
        userId: doc.data().userId,
        createdAt: doc.data().createdAt?.seconds
          ? new Date(doc.data().createdAt.seconds * 1000).toISOString()
          : doc.data().createdAt,
      }));
      return cards;
    } catch (error) {
      const err = error as Error;

      return rejectWithValue(err.message);
    }
  },
);

export const createNewCard = createAsyncThunk(
  'cards/addCard',
  async (cardData: NewProduct, {rejectWithValue}) => {
    try {
      const newCardRef = firestore().collection('cards').doc();

      await newCardRef.set({
        ...cardData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('herer cardData ADD', cardData);
      return {...cardData};
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId: string, {rejectWithValue}) => {
    try {
      const cardRef = firestore().collection('cards').doc(cardId);

      await cardRef.delete();

      return cardId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
