import { NavigationProp } from "@react-navigation/native";
import React from "react";


import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
  brandName: string;
};

type Subscription = {
  isSubscribed: boolean;
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StackParamList = {
  AccountInfo: { userId: number };
  CustomerBasket: { email: string };
  EditEmail: undefined;
  DeleteAccount: undefined;
  ProjectInfo: undefined;
  Queries: undefined;
  PartScreen: undefined;
  LanguageSelect: undefined;
  Intro: undefined;
  PrivacyPolicy: undefined;
  ShopFront: { email: string };
  VerifyAge: undefined;
  ForgotPassword: undefined;
  LoginScreen: undefined;
  NewPassword: undefined;
  SignUp: undefined;
  VerifyEmail: undefined;
  RegisterEmail: undefined;
  ConfirmationPage: undefined;
  DeliveryAddress: undefined;
  BrandVarieties: { brand: string };
  ContinueShopping: undefined;
  JuiceProductPage: undefined;
  JuiceScreen: undefined;
  ProductPage: undefined;
  SearchProducts: undefined;
  VapeScreen: undefined;
  FormScreen: undefined;
  SubSignUp: { subscription: Subscription, navigation: any, route: any };
  SubVapeScreen: undefined;
  NotFoundScreen: undefined;
  ChooseFlavours: undefined;
  ManageSubscription: { subscription: Subscription };
  CancelMembership: undefined;
  ChangeAddress: undefined;
  ChangeFlavours: undefined;
  CancelConfirm: undefined;
  NonDisposableScreen: undefined;
  NonDisposableProductPage: undefined;
  BrandBox: { product: any, selected: boolean, quantity: number, onSelect: () => void, onDeselect: () => void };
  ShopFooter: { subscription: Subscription };
};