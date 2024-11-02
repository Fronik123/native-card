import React from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

//component
import CustomLongButton from '../component/CustomLongButton';
import {StackScreenProps} from '@react-navigation/stack';
import ProductCard from '../component/ProductCard';

// type CategoryScreenProps = StackNavigationProp<
//   RootStackParamList,
//   'CategoryScreen'
// >;

type Props = {
  navigation: CategoryScreenProps;
  route: RouteProp<RootStackParamList, 'ShowAllCardsScreen'>;
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 15;

const ShowAllCardsScreen: React.FC<Props> = ({navigation, route}) => {
  const {cards} = route.params;

  console.log('herer cards', typeof cards);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
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

export default ShowAllCardsScreen;
