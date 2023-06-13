import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type ShopFooterProps = {
  navigation: NavigationProp<StackParamList>;
}

const ShopFooter: React.FC<ShopFooterProps> = ({ navigation }) => {
  const [isSubscribed, setIsSubscribed] = useState(false); // Add this line

  const route = useRoute();

  const componentNames = ['BrandVarieties','JuiceProductPage','SearchProducts','ContinueShopping','ProductPage','ShopFront', 'VapeScreen', 'JuiceScreen'];

  const signUpComponentNames = ["SubSignUp", "YourFlavours","ManageSubscription","SubVapeScreen","ChooseFlavours"];

  const isShopComponent = componentNames.includes(route?.name);
  const isAccountInfoComponent = route?.name === 'AccountInfo';

  const isSubSignUpComponent = signUpComponentNames.includes(route?.name);
  const subscription = { isSubscribed, setIsSubscribed };

  const handleVapePress = () => {
    if (isSubscribed) {
      navigation.dispatch(StackActions.push('ManageSubscription', { subscription }));
    } else {
      navigation.dispatch(StackActions.push('SubSignUp', { subscription }));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.footerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('ShopFront')} disabled={isShopComponent}>
          <Image
            source={require('../pictures/haus-removebg-preview.png')}
            style={[styles.icon, isShopComponent && styles.disabledIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.push('AccountInfo'))} disabled={isAccountInfoComponent}>
          <Image 
            source={require('../pictures/person-removebg-preview.png')} 
            style={[styles.icon, isAccountInfoComponent && styles.disabledIcon]} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerBasket')}>
          <Image source={require('../pictures/basket-removebg-preview.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVapePress} disabled={isSubSignUpComponent}>
          <Image 
            source={require('../pictures/vape-removebg-preview.png')} 
            style={[styles.icon, isSubSignUpComponent && styles.disabledIcon]} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  disabledIcon: {
    tintColor: 'blue',
  },
});

export default ShopFooter;