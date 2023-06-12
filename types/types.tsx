import { NavigationProp } from "@react-navigation/native";

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
  brandName: string;
};

export type StackParamList = {
  AccountInfo: { userId: number };
  CustomerBasket: undefined;
  DeleteAccount: undefined;
  ProjectInfo: undefined;
  Queries: undefined;
  LanguageSelect: undefined;
  Intro: undefined;
  PrivacyPolicy: undefined;
  ShopFront: undefined;
  VerifyAge: undefined;
  ForgotPassword: undefined;
  LoginScreen: undefined;
  NewPassword: undefined;
  SignUp: undefined;
  VerifyEmail: undefined;
  ConfirmationPage: undefined;
  DeliveryAddress: undefined;
  BrandVarieties: { brand: string };
  ContinueShopping: undefined;
  JuiceProductPage: undefined;
  JuiceScreen: undefined;
  ProductPage: undefined;
  SearchProducts: undefined;
  VapeScreen: undefined;
  SubSignUp: undefined;
  SubVapeScreen: undefined;
  NotFoundScreen: undefined;
  ChooseFlavours: undefined;
  ManageSubscription: undefined;
  CancelMembership: undefined;
  ChangeAddress: undefined;
  ChangeFlavours: undefined;
  CancelConfirm: undefined;
  NonDisposableScreen: undefined;
  NonDisposableProductPage: undefined;
};