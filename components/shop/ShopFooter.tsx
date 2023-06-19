import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


type ShopFooterProps = {
  navigation: NavigationProp<StackParamList>;
  style?: Object;
}

const ShopFooter: React.FC<ShopFooterProps> = ({ navigation, style }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const route = useRoute();

  const componentNames = ['BrandVarieties','JuiceProductPage','SearchProducts','NonDisposableScreen','NonDisposableProductPage','BrandVarieties','PartScreen','PartProductPage','ContinueShopping','ProductPage','ShopFront', 'VapeScreen', 'JuiceScreen'];
  const signUpComponentNames = ["SubSignUp", "YourFlavours","ManageSubscription","SubVapeScreen","ChooseFlavours"];
  const isQueryLanguageSelectorComponent = route?.name === 'QueryLanguageSelector';
  const isShopComponent = componentNames.includes(route?.name);
  const isAccountInfoComponent = route?.name === 'AccountInfo';
  const isSubSignUpComponent = signUpComponentNames.includes(route?.name);
  const subscription = { isSubscribed, setIsSubscribed };
  const isCandiiTalkComponent = route?.name === 'CandiiTalk';
  const isCustomerBasketComponent = route?.name === 'CustomerBasket';

  const handleVapePress = async () => {
    if (isSubscribed) {
      await AsyncStorage.setItem('lastTab', 'ManageSubscription');
      navigation.dispatch(StackActions.push('ManageSubscription', { subscription }));
    } else {
      await AsyncStorage.setItem('lastTab', 'SubSignUp');
      navigation.dispatch(StackActions.push('SubSignUp', { subscription }));
    }
  }

  useEffect(() => {
    if (isShopComponent) {
      AsyncStorage.setItem('lastShopTab', route?.name);
    }
  }, [isShopComponent, route]);

  const onPressHome = async () => {
    const lastShopTab = await AsyncStorage.getItem('lastShopTab'); // add await here
    if (lastShopTab) {
      navigation.navigate(lastShopTab as any);
    } else {
      navigation.navigate('ShopFront');
    }
  }

  return (
    <View style={style}>
      <SafeAreaView style={styles.container}>
        <View style={styles.footerContent}>
          <TouchableOpacity
            onPress={onPressHome}
            disabled={isShopComponent}
            style={styles.iconContainer}>
            <View style={activeTab === 'home' ? styles.activeTabLine : null} />  {/* Conditionally display the orange line */}
            <Image
              source={require('../pictures/haus-removebg-preview.png')}
              style={[styles.icon, isShopComponent && styles.disabledIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => { setActiveTab('candii'); navigation.dispatch(StackActions.push('CandiiTalk')); }} disabled={isCandiiTalkComponent}>
            <View style={activeTab === 'candii' ? styles.activeTabLine : null} />  {/* Conditionally display the orange line */}
            <Image 
              source={require('../pictures/heart.png')} 
              style={[styles.icon, isCandiiTalkComponent && styles.disabledIcon]} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => { setActiveTab('basket'); navigation.navigate('CustomerBasket', { email: 'example@example.com' }); }} disabled={isCustomerBasketComponent}>
            <View style={activeTab === 'basket' ? styles.activeTabLine : null} />  {/* Conditionally display the orange line */}
            <Image 
              source={require('../pictures/basket-removebg-preview.png')} 
              style={[styles.icon, isCustomerBasketComponent && styles.disabledIcon]} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={handleVapePress} disabled={isSubSignUpComponent}>
            <View style={activeTab === 'vape' ? styles.activeTabLine : null} />  {/* Conditionally display the orange line */}
            <Image 
              source={require('../pictures/vape-removebg-preview.png')} 
              style={[styles.icon, isSubSignUpComponent && styles.disabledIcon]} 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  activeTabLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'orange',
    position: 'absolute',
    top: 0,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  disabledIcon: {
    tintColor: '#FCCC7C',
  },
});

export default ShopFooter;