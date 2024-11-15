import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stack} from '../types/pageTypes';

import DetailsScreen from '../page/DetailsScreen';

//screen
import SignInScreen from '../page/SignInScreen';
import RegistrationScreen from '../page/RegistrationScreen';
import MyProductsScreen from '../page/MyProductsScreen';
import CategoryScreen from '../page/CategoryScreen';
import CurrentCategoryScreen from '../page/CurrentCategoryScreen';
import ShowAllCardsScreen from '../page/ShowAllCardsScreen';
import FavoritesCardsScreen from '../page/FavoritesCardsScreen';
import EditProfileScreen from '../page/EditProfileScreen';

//navigation
import TabNavigator from './bottom-navigate/TabNavigator';

import {StateType, DispatchType} from '../redux/store';
import {UseDispatch, useDispatch, useSelector} from 'react-redux';
import {checkAuthStatus} from '../redux/action/authAction';

const Navigation: React.FC = () => {
  const dispatch = useDispatch<DispatchType>();
  const {user} = useSelector((state: StateType) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator
          // initialRouteName="SignInScreen"
          screenOptions={{
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}>
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{headerTitle: ''}}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{headerTitle: ''}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerTitle: '', headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            // options={{headerTitle: 'Details product'}}
          />
          <Stack.Screen name="MyProductsScreen" component={MyProductsScreen} />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{headerTitle: 'Category'}}
          />
          <Stack.Screen
            name="CurrentCategoryScreen"
            component={CurrentCategoryScreen}
            options={{headerTitle: 'Current category'}}
          />
          <Stack.Screen
            name="ShowAllCardsScreen"
            component={ShowAllCardsScreen}
            options={{headerTitle: ''}}
          />
          <Stack.Screen
            name="FavoritesCardsScreen"
            component={FavoritesCardsScreen}
            options={{headerTitle: ''}}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{headerTitle: 'Profile'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
