import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomButton from '../component/CustomButton';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import {StateType, DispatchType} from './../redux/store';
import {useDispatch, useSelector} from 'react-redux';

//component
import ProductCard from '../component/ProductCard';

type Props = {
  // navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 15;

const MyProductsScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();

  const {cards, loading} = useSelector((state: StateType) => state.cards);
  const {userData} = useSelector((state: StateType) => state.user);

  const filterProduct = useMemo(() => {
    return cards.filter(item => item.userId === userData?.id);
  }, [cards, userData]);

  useEffect(() => {}, []);

  return (
    <>
      {loading && <ActivityIndicator size="large" color="green" />}

      {filterProduct.length ? (
        <View style={styles.container}>
          <FlatList
            data={filterProduct}
            renderItem={({item}) => (
              <View style={styles.cardWidth}>
                <ProductCard product={item} navigation={navigation} />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />

          <View style={styles.containerButton}>
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
      ) : (
        <View style={styles.containerNoCard}>
          <Text style={styles.textNoResult}>Your products is Empty</Text>

          <CustomButton
            bgColor="#8E6CEF"
            textColor="#FFFFFF"
            text="Add new product"
            onPress={() =>
              navigation.navigate('NewCardStack', {screen: 'AddCardScreen'})
            }
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  cardWidth: {
    width: cardWidth,
  },

  containerButton: {
    marginTop: 15,
  },

  containerNoCard: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },

  textNoResult: {
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 27,
    fontWeight: '500',
  },
});

export default MyProductsScreen;
