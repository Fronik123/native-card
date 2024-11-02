import React from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/pageTypes';

//component
import {StackScreenProps} from '@react-navigation/stack';
import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

import {Formik} from 'formik';
import * as Yup from 'yup';

// type EditProfileScreenProps = StackNavigationProp<
//   RootStackParamList,
//   'CategoryScreen'
// >;
type EditProfileScreenProps = StackNavigationProp<
  RootStackParamList,
  'EditProfileScreen'
>;

type Props = {
  navigation: EditProfileScreenProps;
  // route: RouteProp<RootStackParamList, 'ShowAllCardsScreen'>;
};

const EditProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const currentUser = route.params.userData;

  // console.log('herer cards', typeof cards);
  console.log('herer currentUser', currentUser);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    surname: Yup.string(),
    email: Yup.string().required('Required field'),
    phone: Yup.string().required('Required field'),
  });

  const handleSubmit = () => {};

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
