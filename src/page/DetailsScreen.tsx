import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

import CustomButton from '../component/CustomButton';

import Swiper from 'react-native-swiper';

type DetailsScreenProps = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenProps;
  route: RouteProp<RootStackParamList, 'Details'>;
};

const screenWidth = Dimensions.get('window').width;

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {product} = route.params;
  const allImg = product.image;

  return (
    <View style={styles.container}>
      {allImg?.[0] ? (
        <Swiper loop={false}>
          {allImg?.map((item, index) => (
            <View style={styles.slide1} key={index}>
              <Image source={{uri: item || undefined}} style={styles.image} />
            </View>
          ))}
        </Swiper>
      ) : (
        <Text style={styles.noImg}>No Img</Text>
      )}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.descriptionText}>{product.description}</Text>

      <View style={styles.wrapperPrice}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      <CustomButton
        borderColor="#8E6CEF"
        outline={true}
        textColor="#8E6CEF"
        text="Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 465,
    paddingHorizontal: 15,
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: screenWidth,
    height: 200,
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
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },

  description: {
    paddingBottom: 12,
    width: '100%',
    fontWeight: '500',
    fontSize: 17,
  },

  descriptionText: {
    width: '100%',
  },

  wrapperPrice: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 15,
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
