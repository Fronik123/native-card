import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchProducts, deleteProduct} from '../redux/action/cardAction';
import {DispatchType} from './../redux/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';
import {Product} from '../types/product';

interface ProductCardProps {
  product: Product;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const ProductCard: React.FC<ProductCardProps> = ({product, navigation}) => {
  const dispatch = useDispatch<DispatchType>();
  const openDetails = () => {
    navigation.navigate('Details', {product});
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <TouchableOpacity onPress={() => openDetails()}>
      <View style={styles.card}>
        {product.image ? (
          <Image source={{uri: product.image}} style={styles.image} />
        ) : (
          <View style={styles.containerNoImg}>
            <Text style={styles.noImg}>No IMG</Text>
          </View>
        )}

        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>$ {product.price}</Text>
          </View>

          <View style={styles.wrapperDelete}>
            <TouchableOpacity
              style={styles.innerDelete}
              onPress={() => handleDelete(product.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,

    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  containerNoImg: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noImg: {
    fontSize: 15,
  },

  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },

  price: {
    color: '#888',
  },

  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    height: '100%',
  },

  wrapperDelete: {
    alignItems: 'flex-end',
  },

  innerDelete: {
    width: 60,
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'red',
  },

  deleteText: {
    color: '#ffff',
    textAlign: 'center',
  },
});

export default ProductCard;
