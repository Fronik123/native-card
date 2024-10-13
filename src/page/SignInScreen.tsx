import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

interface FormValues {
  email: string;
  password: string;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const handleFirebaseLogin = async (
    values: FormValues,
    {setErrors}: FormikHelpers<FormValues>,
  ) => {
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      // alert('Успешный вход!');

      navigation.navigate('Home');
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setErrors({email: 'Invalid email format'});
      } else if (error.code === 'auth/user-not-found') {
        setErrors({email: 'User not found'});
      } else if (error.code === 'auth/wrong-password') {
        setErrors({password: 'Incorrect password'});
      } else {
        Alert.alert('Error signing in. \n Try again.');
      }
    }
  };

  const createAccount = () => {
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in</Text>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleFirebaseLogin}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <CustomInput
              placeholder="First name"
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
              // secureTextEntry
            />

            <CustomButton
              bgColor="#8E6CEF"
              textColor="#FFFFFF"
              text="Continue"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>

      <TouchableOpacity onPress={createAccount}>
        <Text style={styles.textAccount}>
          Dont have an Account?{' '}
          <Text style={{fontWeight: '600'}}>Create one</Text>
        </Text>
      </TouchableOpacity>
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

export default SignInScreen;
