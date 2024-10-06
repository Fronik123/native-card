import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

import CustomButton from '../component/CustomButton';

type DetailsScreenProps = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenProps;
  route: RouteProp<RootStackParamList, 'Details'>;
};

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {product} = route.params;

  return (
    <View style={styles.container}>
      {product.image ? (
        <Image
          source={{uri: product.image}}
          style={styles.image}
          accessibilityLabel={product.title}
        />
      ) : (
        <Text style={styles.noImg}>No Img</Text>
      )}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.wrapperPrice}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.price}>$ {product.price}</Text>
      </View>

      <CustomButton
        borderColor="#002984"
        outline={true}
        textColor="#002984"
        text="Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  noImg: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 200,
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },

  title: {
    margin: 10,
  },

  description: {
    textAlign: 'justify',
    width: '100%',
  },

  wrapperPrice: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },

  priceLabel: {
    fontSize: 16,
    marginRight: 5,
  },

  price: {
    fontSize: 16,
  },
});

export default DetailsScreen;
