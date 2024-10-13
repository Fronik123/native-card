import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {StateType, DispatchType} from './../redux/store';
import {fetchProducts} from '../redux/action/cardAction';
import ProductCard from '../component/ProductCard';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomButton from '../component/CustomButton';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();
  const {card, loading} = useSelector((state: StateType) => state.card);
  const mamoizedProducts = useMemo(() => card, [card]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => null,
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.store}>Store</Text>
      <View style={styles.wrapperList}>
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
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
          bgColor="#002984"
          textColor="#FFFFFF"
          text="Add new card"
          onPress={() => navigation.navigate('AddCard')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 70,
  },

  store: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#002984',
  },

  listContainer: {
    paddingBottom: 20,
  },

  wrapperList: {
    height: 450,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  wrapperButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HomeScreen;
