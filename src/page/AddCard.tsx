import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {RootStackParamList} from '../types/pageTypes';

import {fetchProducts, saveProduct} from '../redux/action/cardAction';
import {DispatchType} from './../redux/store';
import {Product} from '../types/product';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AddCard'>;
};

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Required field'),
  price: Yup.number()
    .required('Required field')
    .positive('The price must be positive')
    .integer('The price must be an integer'),
  description: Yup.string().required('Required field'),
});

const AddCardScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();

  const handleSubmit = async (values: any) => {
    const newProduct: Product = {
      id: Date.now(),
      title: values.productName,
      price: parseFloat(values.price || 0),
      description: values.description,
    };

    try {
      await dispatch(saveProduct(newProduct)).unwrap();
      await dispatch(fetchProducts());

      values.productName = '';
      values.price = '';
      values.description = '';

      navigation.goBack();
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add product</Text>
      <Formik
        initialValues={{productName: '', price: '', description: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Product name"
              onChangeText={handleChange('productName')}
              onBlur={handleBlur('productName')}
              value={values.productName}
            />
            {errors.productName && (
              <Text style={styles.error}>{errors.productName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
            />
            {errors.price && <Text style={styles.error}>{errors.price}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Description product"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <Button title="Add card" onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddCardScreen;
