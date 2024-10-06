import React, {useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Button,
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
        <Button
          title="Add new card"
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
    fontSize: 19,
    marginBottom: 20,
  },

  listContainer: {
    paddingBottom: 20,
  },

  wrapperList: {
    height: 450,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  wrapperButton: {
    marginTop: 30,
  },
});

export default HomeScreen;
