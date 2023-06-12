import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrivacyPolicy from './components/onboarding/PrivacyPolicy';
import Intro from './components/onboarding/Intro';
import React from 'react';
import LanguageSelect from './components/onboarding/LanguageSelect';
import ShopFront from './components/onboarding/ShopFront';
import VerifyAge from './components/onboarding/VerifyAge';
import VapeScreen from './components/shop/VapeScreen';
import JuiceScreen from './components/shop/JuiceScreen';
import NonDisposableScreen from './components/shop/NonDisposableScreen';
import LostConnection from './components/anomalies/LostConnection';
import BrandVarieties from './components/shop/BrandVarieties';
import CancelConfirm from './components/subscriptions/CancelConfirm';
import CancelMembership from './components/subscriptions/CancelMembership';
import ChangeAddress from './components/subscriptions/ChangeAddress';
import ChangeFlavours from './components/subscriptions/ChangeFlavours';
import ManageSubscription from './components/subscriptions/ManageSubscription';
import SubVapeScreen from './components/subscriptions/SubVapeScreen';
import ChooseFlavours from './components/subscriptions/ChooseFlavours';

export default function App() {


  const Stack = createStackNavigator();



  return (
       <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

            <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
            <Stack.Screen name="ShopFront" component={ShopFront} />
            <Stack.Screen name="VerifyAge" component={VerifyAge} />

            <Stack.Screen name="VapeScreen" component={VapeScreen} />
            <Stack.Screen name="JuiceScreen" component={JuiceScreen} />
            <Stack.Screen name="NonDisposable" component={NonDisposableScreen} />
            <Stack.Screen name="LostConnection" component={LostConnection} />


            <Stack.Screen name="BrandVarieties" component={BrandVarieties} />

            <Stack.Screen name="CancelConfirm" component={CancelConfirm} />
            <Stack.Screen name="BrandVarieties" component={CancelMembership} />
            <Stack.Screen name="BrandVarieties" component={ChangeAddress} />
            <Stack.Screen name="BrandVarieties" component={ChangeFlavours} />
            <Stack.Screen name="BrandVarieties" component={ChooseFlavours} />
            <Stack.Screen name="BrandVarieties" component={ManageSubscription} />
            <Stack.Screen name="BrandVarieties" component={SubVapeScreen} />





         </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
