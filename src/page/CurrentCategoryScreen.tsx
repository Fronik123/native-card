import React from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

//component
import CustomLongButton from '../component/CustomLongButton';
import {StackScreenProps} from '@react-navigation/stack';
import ProductCard from '../component/ProductCard';

import {useDispatch, useSelector} from 'react-redux';
import {StateType, DispatchType} from './../redux/store';

// type CategoryScreenProps = StackNavigationProp<
//   RootStackParamList,
//   'CategoryScreen'
// >;

type Props = {
  // navigation: CategoryScreenProps;
  // route: RouteProp<RootStackParamList, 'CategoryScreen'>;
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 15;

const CurrentCategoryScreen: React.FC<Props> = ({navigation, route}) => {
  const {cards, currentCategory} = route.params;
  const {userData} = useSelector((state: StateType) => state.user);

  const filterCategory = cards.filter(
    item => item.category === currentCategory,
  );

  return (
    <View style={styles.container}>
      {/* {filterCategory.map(item => (
        <Text>{item.title}</Text>
      ))} */}
      <FlatList
        data={filterCategory}
        renderItem={({item}) => (
          <View style={styles.cardWidth}>
            <ProductCard product={item} navigation={navigation} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardWidth: {
    width: cardWidth,
  },
});

export default CurrentCategoryScreen;
