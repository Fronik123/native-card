import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

import {Formik} from 'formik';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const RegistrationScreen: React.FC<Props> = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    email: Yup.string().email('Invalid email').required('Required field'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Required field'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'The passwords do not match')
      .required('Password confirmation is required'),
    // password: Yup.string().required('Required field'),
  });

  const handleSubmit = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      navigation.goBack();
      // console.log('Пользователь успешно зарегистрирован!');
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      <Formik
        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            {/* <TextInput
              style={styles.input}
              placeholder="Product name"
              onChangeText={handleChange('productName')}
              onBlur={handleBlur('productName')}
              value={values.productName}
            />
            {errors.productName && (
              <Text style={styles.error}>{errors.productName}</Text>
            )} */}

            <CustomInput
              placeholder="First name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              errors={errors.name}
            />

            <CustomInput
              placeholder="Email Address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errors={errors.email}
            />

            <CustomInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errors={errors.password}
            />

            <CustomInput
              placeholder="Confirm password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              errors={errors.confirmPassword}
            />

            {/* <TextInput
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
            )} */}

            <CustomButton
              bgColor="#8E6CEF"
              textColor="#FFFFFF"
              text="Create account"
              onPress={() => handleSubmit()}
            />
            <View style={{marginTop: 16}}>
              <CustomButton
                borderColor="#8E6CEF"
                outline={true}
                textColor="#8E6CEF"
                text="Back"
                onPress={() => navigation.goBack()}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    fontSize: 32,
  },

  textAccount: {
    marginTop: 16,
  },
});

export default RegistrationScreen;
