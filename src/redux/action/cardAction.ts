import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../../types/product';

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
