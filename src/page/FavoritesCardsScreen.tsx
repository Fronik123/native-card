import React, {useMemo} from 'react';
import {View, StyleSheet, FlatList, Dimensions, Text} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

//component
import CustomLongButton from '../component/CustomLongButton';
import {StackScreenProps} from '@react-navigation/stack';
import ProductCard from '../component/ProductCard';
import CustomButton from '../component/CustomButton';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {StateType, DispatchType} from './../redux/store';

// type CategoryScreenProps = StackNavigationProp<
//   RootStackParamList,
//   'CategoryScreen'
// >;

// type Props = {
//   // navigation: CategoryScreenProps;
//   navigation: any;
//   route: RouteProp<RootStackParamList, 'CategoryScreen'>;
// };

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 15;

const FavoritesCardsScreen: React.FC<Props> = ({navigation}) => {
  const {cards, loading} = useSelector((state: StateType) => state.cards);

  const favoriteCards = useSelector(
    (state: StateType) => state.favorites.favoriteCards,
  );

  const filterCards = useMemo(() => {
    return cards.filter(card => favoriteCards.includes(card.id.toString()));
  }, [cards, favoriteCards]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {favoriteCards.length ? (
        <FlatList
          data={filterCards}
          renderItem={({item}) => (
            <View style={styles.cardWidth}>
              <ProductCard product={item} navigation={navigation} />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.containerNoResult}>
          <Text style={styles.textNoResult}>Your favorite is Empty</Text>

          <CustomButton
            bgColor="#8E6CEF"
            textColor="#FFFFFF"
            text="Go back"
            onPress={() => handleBack()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardWidth: {
    width: cardWidth,
  },

  listContainer: {
    padding: 15,
  },

  containerNoResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  textNoResult: {
    marginBottom: 20,
    fontSize: 27,
    fontWeight: '500',
    // textAlign: 'center',
  },
});

export default FavoritesCardsScreen;
