import React, {useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';
import {useDispatch, useSelector} from 'react-redux';

//component
import {DispatchType, StateType} from './../redux/store';
import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

import {updateUserData} from '../redux/action/userAction';

import {Formik} from 'formik';
import * as Yup from 'yup';

type EditProfileScreenProps = StackNavigationProp<
  RootStackParamList,
  'EditProfileScreen'
>;

type Props = {
  navigation: EditProfileScreenProps;
  route: RouteProp<RootStackParamList, 'EditProfileScreen'>;
};

const EditProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch<DispatchType>();
  const currentUser = route.params.userData;

  const {loading, error} = useSelector((state: StateType) => state.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    surname: Yup.string(),
    email: Yup.string().required('Required field'),
    phone: Yup.number()
      .required('Required field')
      .typeError('Only digits are allowed'),
  });

  useEffect(() => {
    if (error) {
      Alert.alert('', error);
    }
    if (loading) {
      Alert.alert('Success', 'Data updated successfully');
    }
  }, [loading, error]);

  const handleSubmit = (values: any) => {
    const data = {
      id: currentUser.id,
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      email: values.email,
    };

    dispatch(updateUserData({userId: currentUser.id, newData: data}));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: currentUser.name,
          surname: currentUser.surname,
          email: currentUser.email,
          phone: currentUser.phone,
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
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
              placeholder="Email Address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errors={errors.email}
              editable={false}
            />

            <CustomInput
              placeholder="Phone"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              errors={errors.phone}
            />

            <CustomButton
              bgColor="#8E6CEF"
              textColor="#FFFFFF"
              text="Save"
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
    flex: 1,
    padding: 15,
  },
});

export default EditProfileScreen;
