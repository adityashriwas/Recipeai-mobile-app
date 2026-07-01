import { NavigatorScreenParams } from '@react-navigation/native';

export enum RootRoutes {
  AuthStack = 'AuthStack',
  MainTabs = 'MainTabs',
}

export enum AuthRoutes {
  Login = 'Login',
  Signup = 'Signup',
}

export enum MainRoutes {
  Home = 'Home',
  Store = 'Store',
  Profile = 'Profile',
  Category = 'Category',
  ProductDetails = 'ProductDetails',
  Checkout = 'Checkout',
  Cart = 'Cart',
  AddAddress = 'AddAddress',
  EditAddress = 'EditAddress',
}

export type RootStackParamList = {
  [RootRoutes.AuthStack]: undefined;
  [RootRoutes.MainTabs]: undefined;
};

export type AuthStackParamList = {
  [AuthRoutes.Login]: undefined;
  [AuthRoutes.Signup]: undefined;
};

export type MainTabParamList = {
  [MainRoutes.Home]: undefined;
  [MainRoutes.Store]: undefined;
  [MainRoutes.Cart]: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  [MainRoutes.ProductDetails]: { productId: string };
  [MainRoutes.EditAddress]: { addressId: string };
  [MainRoutes.Category]: undefined;
  [MainRoutes.Checkout]: undefined;
  [MainRoutes.AddAddress]: undefined;
  [MainRoutes.Profile]: undefined;
};
