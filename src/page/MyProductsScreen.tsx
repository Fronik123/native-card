import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../component/CustomButton';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import {StateType, DispatchType} from './../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';

//slice
import {loginTestChange} from '../redux/reducers/authSlice';

//component

type Props = {
  // navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const MyProductsScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();
  const [myCart, setMyCart] = useState([]);

  const getUserCards = async () => {
    const user = auth().currentUser;
    console.log('here user', user);

    if (user) {
      // console.log('after user', user.uid);
      const snapshot = await firebase()
        .collection('cards')
        .where('userId', '==', user.uid)
        // .orderBy('createdAt', 'desc')
        .get();
      // console.log('here snapshie', snapshot.docs);
      const userCards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // console.log('curent dociment', userCards);
      setMyCart(userCards);
      return userCards;
    } else {
      console.log('User is not logged in.');
      return [];
    }
  };

  // const cards = productsSnapshot.docs.map(doc => ({
  //   id: doc.id,
  //   title: doc.data().title,
  //   image: doc.data().img,
  //   description: doc.data().description,
  //   price: doc.data().price,
  // }));

  useEffect(() => {
    getUserCards();
  }, []);

  return (
    <View style={styles.container}>
      <Text>My Products</Text>

      <FlatList
        data={myCart}
        renderItem={({item}) => (
          <View style={styles.containerProduct}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        // contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
  },
  containerProduct: {},
});

export default MyProductsScreen;
