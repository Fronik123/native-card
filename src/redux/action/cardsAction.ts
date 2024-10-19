import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../../types/product';

//firebasestore
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/app';

export const fetchProducts = createAsyncThunk(
  'card/fetchProducts',
  async () => {
    const storedProducts = await AsyncStorage.getItem('card');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }

    const response = await axios.get('https://fakestoreapi.com/products');
    const data = response.data;
    await AsyncStorage.setItem('card', JSON.stringify(data));
    return data;
  },
);

export const saveProduct = createAsyncThunk<Product[], Product>(
  'card/saveProduct',
  async product => {
    const storedProducts = await AsyncStorage.getItem('card');
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    products.unshift(product);

    await AsyncStorage.setItem('card', JSON.stringify(products));

    return products;
  },
);

export const deleteProduct = createAsyncThunk<Product[], number>(
  'card/deleteProduct',
  async productId => {
    const storedProducts = await AsyncStorage.getItem('card');
    const products: Product[] = storedProducts
      ? JSON.parse(storedProducts)
      : [];

    const updatedProducts = products.filter(
      product => product.id !== productId,
    );

    await AsyncStorage.setItem('card', JSON.stringify(updatedProducts));
    return updatedProducts;
  },
);

//firebase

export const getDataFirebase = createAsyncThunk(
  'cards/fetchCards',
  async (_, {rejectWithValue}) => {
    try {
      const cachedProducts = await AsyncStorage.getItem('cards');
      if (cachedProducts) {
        // Если кэшированные данные есть, возвращаем их
        return JSON.parse(cachedProducts);
      }

      const productsSnapshot = await firestore().collection('cards').get();
      const cards = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        image: doc.data().img,
        description: doc.data().description,
        price: doc.data().price,
      }));

      return cards;
    } catch (error) {
      console.log('badddddddddd');
      const err = error as Error; //позже проверить

      return rejectWithValue(err.message);
    }
  },
);
