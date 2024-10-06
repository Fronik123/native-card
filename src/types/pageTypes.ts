import {Product} from '../types/product';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {product: Product};
  AddCard: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();
