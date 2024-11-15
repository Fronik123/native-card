import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';

interface Props {
  navigation: any;
}

const AuthLoadingScreen: React.FC<Props> = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(users => {
      setUser(users);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, []);

  if (initializing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return user ? (
    <HomeScreen navigation={navigation} />
  ) : (
    <SignInScreen navigation={navigation} />
  );
};

export default AuthLoadingScreen;
