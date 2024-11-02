import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Product} from '../types/product';

//image
import Car from '../assets/icon/category/car.png';
import Electronic from '../assets/icon/category/electronic.png';
import Hobby from '../assets/icon/category/hobby.png';
import Free from '../assets/icon/category/free.png';
import Rent from '../assets/icon/category/rent.png';
import Home from '../assets/icon/category/home.png';
import Fashion from '../assets/icon/category/fashion.png';

import {useDispatch, useSelector} from 'react-redux';
import {StateType, DispatchType} from './../redux/store';

type Props = {
  cards: Product[];
  navigation: any;
};

const textImageMap: any = {
  Car: Car,
  Electronics: Electronic,
  Hobby: Hobby,
  Free: Free,
  Rent: Rent,
  Home: Home,
  Fashion: Fashion,
};

const CategoryFlatList: React.FC<Props> = ({cards, navigation}) => {
  const uniqueCategories = useSelector(
    (state: StateType) => state.cards.uniqueCategories,
  );

  const handleAllCategory = (category: any) => {
    console.log('herer', category);
    navigation.navigate('CategoryScreen', {
      uniq: uniqueCategories,
      img: textImageMap,
      cards: cards,
    });
  };

  const handleCurrentCategory = (currentCategory: any) => {
    navigation.navigate('CurrentCategoryScreen', {
      currentCategory: currentCategory,
      cards: cards,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.categoryText}>Categories</Text>

        <TouchableOpacity onPress={() => handleAllCategory(uniqueCategories)}>
          <Text style={styles.categoryAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={uniqueCategories}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleCurrentCategory(item, textImageMap[item])}
            style={styles.wrapperCategory}>
            <View style={styles.wrapperImg}>
              <Image style={styles.img} source={textImageMap[item]} />
            </View>

            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  wrapperCategory: {
    alignItems: 'center',
    marginRight: 10,
  },
  wrapperImg: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },

  listContainer: {
    paddingBottom: 12,
  },

  img: {
    height: 30,
    width: 30,
  },

  containerHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
  },

  categoryText: {
    fontWeight: '600',
    fontSize: 16,
  },

  categoryAllText: {
    fontSize: 16,
  },
});

export default CategoryFlatList;
