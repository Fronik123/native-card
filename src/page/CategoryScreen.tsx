import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

//component
import CustomLongButton from '../component/CustomLongButton';
import {StackScreenProps} from '@react-navigation/stack';

type CategoryScreenProps = StackNavigationProp<
  RootStackParamList,
  'CategoryScreen'
>;

type Props = {
  // navigation: CategoryScreenProps;
  navigation: any;
  route: RouteProp<RootStackParamList, 'CategoryScreen'>;
};

const CategoryScreen: React.FC<Props> = ({navigation, route}) => {
  const {uniq, img, cards} = route.params;

  const currentCategory = (item: any) => {
    navigation.navigate('CurrentCategoryScreen', {
      currentCategory: item,
      cards: cards,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={uniq}
        renderItem={({item}) => (
          <CustomLongButton
            withImg
            img={img[item]}
            text={item}
            onPress={() => currentCategory(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default CategoryScreen;
