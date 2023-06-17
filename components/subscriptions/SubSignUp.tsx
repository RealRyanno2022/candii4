import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import LazySubSignUpContent from './LazySubSignUpContent';

type SubSignUpProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'SubSignUp'>;
}

const SubSignUp: React.FC<SubSignUpProps> = ({ navigation, route }) => {
  const [subscriptionType, setSubscriptionType] = useState('yearly');
  const { subscription } = route.params;
  const { isSubscribed, setIsSubscribed } = subscription;

  const handleSubscriptionTypeChange = (type: string) => {
    setSubscriptionType(type);
  };

  return (
    <View style={styles.mainContainer}>
      <ShopHeader navigation={navigation} />
      <ScrollView bounces={false} style={styles.container}>
        <React.Suspense fallback={null}>
          <LazySubSignUpContent navigation={navigation} />
        </React.Suspense>
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );


};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    justifyContent: 'space-between',  // new line
  },
  container: {
    backgroundColor: '#FCCC7C',
    marginBottom: 20,  // new line
  },
  backgroundWave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderBottomLeftRadius: 150,
    backgroundColor: '#FF6347',
    zIndex: -1,
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    height: 225,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    marginBottom: 10,
  },
  subscriptionInfo: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  subscriptionInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
  },
  subscriptionInfoDescription: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  space: {
    marginBottom: 50,
  },
  signUpButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
});

export default SubSignUp;