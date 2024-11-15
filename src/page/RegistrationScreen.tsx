import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

import {StateType, DispatchType} from './../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/action/authAction';
import {NewUserData} from '../types/userData';

import {resetSuccess} from '../redux/reducers/authSlice';

import {Formik} from 'formik';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const RegistrationScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();

  const {loading, success} = useSelector((state: StateType) => state.auth);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    email: Yup.string().email('Invalid email').required('Required field'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Required field'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'The passwords do not match')
      .required('Password confirmation is required'),
    phone: Yup.number()
      .required('Required field')
      .typeError('Only digits are allowed'),
  });

  const onSubmit = (values: NewUserData) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (success) {
      Alert.alert('', 'Create new account', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
            dispatch(resetSuccess());
          },
        },
      ]);
    }
  }, [success, navigation, dispatch]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Create Account</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
          surname: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <CustomInput
              placeholder="First name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              errors={errors.name}
            />

            <CustomInput
              placeholder="Surname"
              value={values.surname}
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              errors={errors.surname}
            />

            <CustomInput
              placeholder="Phone"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              errors={errors.phone}
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

            <CustomButton
              bgColor="#8E6CEF"
              textColor="#FFFFFF"
              text="Create account"
              onPress={() => handleSubmit()}
            />

            <View style={styles.containerBack}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 70,
  },
  header: {
    marginBottom: 32,
    fontSize: 32,
  },

  textAccount: {
    marginTop: 16,
  },

  containerBack: {
    marginTop: 16,
  },
});

export default RegistrationScreen;
