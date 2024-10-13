/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Stack} from './src/types/pageTypes';

import DetailsScreen from './src/page/DetailsScreen';
import HomeScreen from './src/page/HomeScreen';
import AddCard from './src/page/AddCard';
import SignInScreen from './src/page/SignInScreen';
import RegistrationScreen from './src/page/RegistrationScreen';
import AuthLoadingScreen from './src/page/AuthLoadingScreen';

import store from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignInScreen"
          screenOptions={{
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}>
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
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

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerTitle: 'Card List'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerTitle: 'Details product'}}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={{headerTitle: ''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
