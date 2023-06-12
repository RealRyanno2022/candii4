import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrivacyPolicy from './components/onboarding/PrivacyPolicy';
import Intro from './components/onboarding/Intro';
import React from 'react';
import LanguageSelect from './components/onboarding/LanguageSelect';
import ShopFront from './components/onboarding/ShopFront';
import VerifyAge from './components/onboarding/VerifyAge';

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
