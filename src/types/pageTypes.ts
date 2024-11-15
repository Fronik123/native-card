import {Product} from '../types/product';
import {UserData} from './userData';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Details: {product: Product};
  AddCardScreen: undefined;
  SignInScreen: undefined;
  AuthLoadingScreen: undefined;
  RegistrationScreen: undefined;
  Settings: undefined;
  TabNavigator: undefined;
  SettingStack: undefined;
  MyProductsScreen: undefined;
  CategoryScreen: {uniq: string[]; img: {[key: string]: number}};
  CurrentCategoryScreen: undefined;
  ShowAllCardsScreen: {cards: Product[]};
  FavoritesCardsScreen: undefined;
  EditProfileScreen: {userData: UserData | null};
};

export type RootBottomParamList = {
  HomeStack: undefined;
  SettingStack: undefined;
  NewCardStack: NavigatorScreenParams<RootStackParamList>;
};

export const Stack = createStackNavigator<RootStackParamList>();
export const Tab = createBottomTabNavigator<RootBottomParamList>();
