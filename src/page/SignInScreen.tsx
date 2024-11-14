import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

import {useDispatch, useSelector} from 'react-redux';
import {StateType, DispatchType} from './../redux/store';

import {loginUser} from '../redux/action/authAction';

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
  const dispatch = useDispatch<DispatchType>();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const {loading, error} = useSelector((state: StateType) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
  }, [error]);

  const handleFirebaseLogin = (values: {email: string; password: string}) => {
    dispatch(loginUser(values));
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

      {loading && <ActivityIndicator size="large" color="green" />}
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
    paddingBottom: 15,
  },
});

export default SignInScreen;
