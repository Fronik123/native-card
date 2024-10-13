import {Product} from '../types/product';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {product: Product};
  AddCard: undefined;
  SignInScreen: undefined;
  AuthLoadingScreen: undefined;
  RegistrationScreen: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();
