import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';

import {RootStackParamList} from '../types/pageTypes';

import DropDownPicker from 'react-native-dropdown-picker';

import {getDataFirebase} from '../redux/action/cardsAction';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, DispatchType} from './../redux/store';

import {Product} from '../types/product';
//action
import {createNewCard} from '../redux/action/cardsAction';

//firebase
import auth from '@react-native-firebase/auth';

//component
import AddNewImage from '../component/AddNewImage';
import CustomButton from '../component/CustomButton';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AddCardScreen'>;
};

const initialValues = {
  id: '',
  userId: '',
  image: [],
  title: '',
  price: 0,
  description: '',
  category: '',
  isUsed: null,
};

const validationSchema = Yup.object().shape({
  image: Yup.array()
    .min(1, 'You must select at least one image')
    .required('Required field'),
  title: Yup.string().required('Required field'),
  price: Yup.number()
    .required('Required field')
    .positive('The price must be positive')
    .integer('The price must be an integer'),
  description: Yup.string().required('Required field'),
  category: Yup.string().required('Required field'),
  isUsed: Yup.boolean().required('Required field'),
});

const AddCardScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();

  const {uniqueCategories, loading, error} = useSelector(
    (state: StateType) => state.cards,
  );

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{label: string; value: string}[]>([]);

  const [isOpenUsed, setisOpenUsed] = useState(false);
  const [itemUsed, setItemUsed] = useState([
    {label: 'Yes', value: true},
    {label: 'No', value: false},
  ]);

  useEffect(() => {
    const transformedCategories = uniqueCategories.map(category => ({
      label: category,
      value: category,
    }));
    setItems(transformedCategories);
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('', error);
    }
    if (loading) {
      Alert.alert('', 'Add new product', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      dispatch(getDataFirebase());
      navigation.goBack();
    }
  }, [dispatch, loading, navigation, error]);

  const user = auth().currentUser;

  const onSubmit = (
    values: Product,
    {resetForm}: FormikHelpers<typeof initialValues>,
  ) => {
    if (user) {
      const userId = user.uid;
      const allImg = values.image
        ? values.image.map((item: any) => item.uri)
        : [];

      const data = {
        userId: userId,
        img: allImg,
        title: values.title,
        description: values.description,
        price: values.price,
        isUsed: values.isUsed,
        category: values.category,
      };
      dispatch(createNewCard(data));

      resetForm();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
        }) => (
          <>
            <AddNewImage
              onImageSelect={(uri: string) => setFieldValue('image', uri)}
            />

            {errors.image && <Text style={styles.error}>{errors.image}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Product name"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <DropDownPicker
              open={isOpenUsed}
              value={values.isUsed}
              items={itemUsed}
              setOpen={setisOpenUsed}
              setValue={callback =>
                setFieldValue('isUsed', callback(values.isUsed))
              }
              setItems={setItemUsed}
              placeholder="Used"
              style={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              listMode="MODAL"
            />

            {errors.isUsed && <Text style={styles.error}>{errors.isUsed}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price.toString()}
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

            <DropDownPicker
              open={open}
              value={values.category}
              items={items}
              setOpen={setOpen}
              setValue={callback =>
                setFieldValue('category', callback(values.category))
              }
              setItems={setItems}
              placeholder="Select category"
              style={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              listMode="MODAL"
            />

            {errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            <View style={styles.wrapperButton}>
              <CustomButton
                bgColor="#8E6CEF"
                textColor="#ffff"
                text="Add card"
                onPress={() => handleSubmit()}
              />
            </View>

            <CustomButton
              borderColor="#8E6CEF"
              outline={true}
              textColor="#8E6CEF"
              text="Back"
              onPress={() => navigation.goBack()}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingBottom: 40,
  },

  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#002984',
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(39, 39, 39, 0.5)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 50,
  },

  dropdown: {
    marginBottom: 15,
    borderColor: 'rgba(39, 39, 39, 0.5)',
    borderRadius: 5,
  },

  dropdownPlaceholder: {
    color: 'rgba(39, 39, 39, 0.5)',
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },

  wrapperButton: {
    marginVertical: 16,
  },
});

export default AddCardScreen;
