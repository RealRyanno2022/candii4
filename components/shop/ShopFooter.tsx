import React, { useState } from 'react';
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

  return (
    <View style={style}>
    <SafeAreaView style={styles.container}>
      <View style={styles.footerContent}>
        <TouchableOpacity
        
        onPress={async () => {
          await AsyncStorage.setItem('lastTab', 'ShopFront');
          navigation.navigate('ShopFront');
        }} 
        disabled={isShopComponent}
        style={styles.iconContainer}>
          <Image
            source={require('../pictures/haus-removebg-preview.png')}
            style={[styles.icon, isShopComponent && styles.disabledIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.dispatch(StackActions.push('CandiiTalk'))} disabled={isCandiiTalkComponent}>
          <Image 
            source={require('../pictures/heart.png')} 
            style={[styles.icon, isCandiiTalkComponent && styles.disabledIcon]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('CustomerBasket')} disabled={isCustomerBasketComponent}>
          <Image 
            source={require('../pictures/basket-removebg-preview.png')} 
            style={[styles.icon, isCustomerBasketComponent && styles.disabledIcon]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={handleVapePress} disabled={isSubSignUpComponent}>
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