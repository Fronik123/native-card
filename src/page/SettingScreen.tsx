import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackParamList} from '../types/pageTypes';
import {StackNavigationProp} from '@react-navigation/stack';

import {StateType, DispatchType} from './../redux/store';
import {useDispatch, useSelector} from 'react-redux';

//action
import {fetchUserData} from '../redux/action/userAction';

//slice
import {logOut} from '../redux/action/authAction';

//component
import CustomLongButton from '../component/CustomLongButton';

import DefaultPerson from '../assets/icon/profile-person/default-person.png';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SettingStack'>;
};

const SettingScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<DispatchType>();

  const {userData, loading: userLoading} = useSelector(
    (state: StateType) => state.user,
  );
  // const isOwner = cards.id === userData?.id;

  const LogOut = () => {
    dispatch(logOut());
  };

  const Edit = () => {
    navigation.navigate('EditProfileScreen', {
      userData,
    });
  };

  const MyProducts = () => {
    navigation.navigate('MyProductsScreen');
  };

  const Favorite = () => {
    navigation.navigate('FavoritesCardsScreen');
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const OnSupport = () => {};
  return (
    <View style={styles.container}>
      {userLoading ? (
        <View style={styles.containerIndicator}>
          <ActivityIndicator size="small" color="#8E6CEF" />
        </View>
      ) : (
        <View>
          <View style={styles.containerImg}>
            {userData?.img ? (
              <Image
                source={{uri: userData?.img || DefaultPerson}}
                width={30}
                height={30}
              />
            ) : (
              <Image
                style={styles.defaultPerson}
                source={require('../assets/icon/profile-person/default-person.png')}
              />
            )}
          </View>

          <View style={styles.containerInfo}>
            <TouchableOpacity onPress={Edit} style={styles.info}>
              <View>
                <Text style={styles.name}>{userData?.name}</Text>
                <Text style={styles.email}>{userData?.email}</Text>
                <Text style={styles.phone}>{userData?.phone}</Text>
              </View>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <CustomLongButton text="My Products" onPress={MyProducts} />

      <CustomLongButton text="Favorite" onPress={Favorite} />

      <CustomLongButton text="Support" onPress={OnSupport} />

      <TouchableOpacity onPress={LogOut}>
        <Text style={styles.signOut}>Sign Out</Text>
      </TouchableOpacity>
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

  containerIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F4F4F4',
    height: 150,
    marginBottom: 26,
  },

  defaultPerson: {
    width: 50,
    height: 50,
  },

  containerImg: {
    alignItems: 'center',
    marginBottom: 32,
  },

  containerInfo: {
    backgroundColor: '#F4F4F4',

    padding: 16,
    borderRadius: 8,
    marginBottom: 26,
    height: 100,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    color: '#272727',
    fontWeight: '800',
    paddingBottom: 8,
  },

  email: {
    color: '#8E8E8E',
    paddingBottom: 8,
  },

  phone: {
    color: '#8E8E8E',
  },
  edit: {
    color: '#8E6CEF',
    fontWeight: '600',
  },

  signOut: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 30,
  },
});

export default SettingScreen;
