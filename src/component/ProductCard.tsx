import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts, deleteProduct} from '../redux/action/cardsAction';
import {DispatchType, StateType} from './../redux/store';
import {StackNavigationProp} from '@react-navigation/stack';
// import {StackScreenProps} from '@react-navigation/stack';

import {Product} from '../types/product';
//type
import {RootStackParamList, RootBottomParamList} from '../types/pageTypes';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

//redux
// import {toggleFavorite} from '../redux/reducers/favoriteSlice';
import {fetchUserData} from '../redux/action/userAction';
import {
  fetchFavoriteCards,
  toggleFavorite,
} from '../redux/action/favoriteCardsAction';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface ProductCardProps {
  product: Product;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<RootBottomParamList, 'NewCardStack'>,
    StackNavigationProp<RootStackParamList>
  >;
}

const ProductCard: React.FC<ProductCardProps> = ({product, navigation}) => {
  const dispatch = useDispatch<DispatchType>();
  const favoriteCards = useSelector(
    (state: StateType) => state.favorites.favoriteCards,
  );
  const {userData} = useSelector((state: StateType) => state.user);

  const isOwns = userData?.id === product.userId;
  const isFavorite = favoriteCards.includes(product.id.toString());

  useEffect(() => {
    dispatch(fetchFavoriteCards());
    dispatch(fetchUserData());
  }, [dispatch]);

  const favoriteCard = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const openDetails = () => {
    navigation.navigate('Details', {product});
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <TouchableOpacity onPress={() => openDetails()}>
      <View style={styles.card}>
        <View style={styles.wrapperImg}>
          {product.image ? (
            <Image source={{uri: product.image}} style={styles.image} />
          ) : (
            <View style={styles.containerNoImg}>
              <Text style={styles.noImg}>No IMG</Text>
            </View>
          )}
        </View>

        {!isOwns && (
          <TouchableOpacity
            onPress={() => favoriteCard(product.id.toString())}
            style={styles.containerFavotite}>
            <View>
              {isFavorite ? (
                <Image
                  source={require('../assets/icon/card/favorit-activ.png')}
                />
              ) : (
                <Image source={require('../assets/icon/card/favorit.png')} />
              )}
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
        </View>
        {/* <View style={styles.info}>
          <View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>$ {product.price}</Text>
          </View>

          <View style={styles.wrapperDelete}>
            <TouchableOpacity
              style={styles.innerDelete}
              onPress={() => handleDelete(product.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,

    margin: 10,

    paddingBottom: 10,
    backgroundColor: '#F4F4F4',
  },

  wrapperImg: {
    borderRadius: 8,
    paddingTop: 3,
    paddingRight: 3,
    paddingLeft: 3,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    position: 'relative',
  },

  containerFavotite: {
    position: 'absolute',
    right: 5,
    top: 5,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  containerNoImg: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noImg: {
    fontSize: 15,
  },

  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },

  price: {
    color: '#888',
  },

  info: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
  },

  wrapperDelete: {
    alignItems: 'flex-end',
  },

  innerDelete: {
    width: 60,
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'red',
  },

  deleteText: {
    color: '#ffff',
    textAlign: 'center',
  },
});

export default ProductCard;
