import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {StateType, DispatchType} from './../redux/store';
import {fetchProducts, getDataFirebase} from '../redux/action/cardsAction';
import {fetchUserData} from '../redux/action/userAction';
import ProductCard from '../component/ProductCard';
import {RootStackParamList, RootBottomParamList} from '../types/pageTypes';
import {StackScreenProps} from '@react-navigation/stack';

import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';

//component
import CustomButton from '../component/CustomButton';
import CategoryFlatList from '../component/CategoryFlatList';
import SearchInput from '../component/SearchInput';

//slice
import {loginTestChange} from '../redux/reducers/authSlice';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootBottomParamList, 'NewCardStack'>,
  StackScreenProps<RootStackParamList, 'Home'>
>;
interface HomeProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();

  const {cards, loading} = useSelector((state: StateType) => state.cards);
  const {loginTest} = useSelector((state: StateType) => state.auth);
  const mamoizedProducts = useMemo(() => cards, [cards]);

  useEffect(() => {
    dispatch(getDataFirebase());
  }, [dispatch, loginTest]);

  const showAllCards = () => {
    navigation.navigate('ShowAllCardsScreen', {cards});
  };

  return (
    <View style={styles.container}>
      <SearchInput />

      <CategoryFlatList cards={cards} navigation={navigation} />

      <View style={styles.containerList}>
        <Text style={styles.textRecomend}>Recommendation for you</Text>
        <TouchableOpacity onPress={showAllCards}>
          <Text style={styles.textAll}>All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wrapperList}>
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            horizontal
            data={mamoizedProducts}
            renderItem={({item}) => (
              <ProductCard product={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      <View style={styles.wrapperButton}>
        <CustomButton
          bgColor="#8E6CEF"
          textColor="#FFFFFF"
          text="Add new card"
          onPress={() =>
            navigation.navigate('NewCardStack', {screen: 'AddCardScreen'})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },

  containerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 24,
  },

  listContainer: {
    paddingBottom: 20,
  },

  textRecomend: {
    fontWeight: '600',
    fontSize: 16,
  },

  textAll: {
    fontSize: 16,
  },

  wrapperList: {
    height: 250,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },

  wrapperButton: {
    marginTop: 30,
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
});

export default HomeScreen;
