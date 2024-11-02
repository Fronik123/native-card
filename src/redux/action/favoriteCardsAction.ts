import {createAsyncThunk} from '@reduxjs/toolkit';
import {Favorites} from '../../types/favorites';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const fetchFavoriteCards = createAsyncThunk(
  'favorites/fetchFavoriteCards',
  async (_, {rejectWithValue}) => {
    const user = auth().currentUser;
    if (!user) {
      return rejectWithValue('Пользователь не авторизован');
    }

    try {
      const userSnapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      const favoriteCardIds = userSnapshot.exists
        ? userSnapshot.data()?.favoriteCards || []
        : [];
      return favoriteCardIds;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (cardId: string, {getState, rejectWithValue}) => {
    const state = getState() as {favorites: Favorites};
    const user = auth().currentUser;

    if (!user) {
      return rejectWithValue('Пользователь не авторизован');
    }

    try {
      const userDocRef = firestore().collection('users').doc(user.uid);

      // Получаем текущий список избранных карточек
      const favoriteCards = state.favorites.favoriteCards;

      let updatedFavorites;
      if (favoriteCards.includes(cardId)) {
        updatedFavorites = favoriteCards.filter(id => id !== cardId);
      } else {
        updatedFavorites = [...favoriteCards, cardId];
      }

      await userDocRef.set({favoriteCards: updatedFavorites}, {merge: true});

      return updatedFavorites;
    } catch (error) {
      console.error('Ошибка при сохранении карточки в избранное:', error);
      return rejectWithValue('Ошибка при сохранении карточки в избранное');
    }
  },
);
