import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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
      <ScrollView contentContainerStyle={styles.container}>
  
        <View style={styles.content}>
          <Text style={styles.title}>Try our Vape Pass!</Text>
          <Text style={styles.title}>Get a discounted vape every week!</Text>
          <Text style={styles.title}></Text>
          <Image source={require('../pictures/subs.jpg')} style={styles.image} />
          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.dispatch(StackActions.push('SubVapeScreen'))}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>What do I get?</Text>
            <Text style={styles.subscriptionInfoDescription}>
              Get a juice of your choice each week, hassle-free!
            </Text>
          </View>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>Why Vape Pass?</Text>
            <Text style={styles.subscriptionInfoDescription}>
              Save a fortune on shipping and have your flavors delivered automatically. You can cancel your subscription at any time.
            </Text>
          </View>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>Can I change flavors?</Text>
            <Text style={styles.subscriptionInfoDescription}>
              Of course! You can change your flavors at any time.
            </Text>
          </View>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>What varieties are there?</Text>
            <Text style={styles.subscriptionInfoDescription}>
              Any e-juice flavor we sell is available.
            </Text>
          </View>
          <View style={styles.space}></View>
        </View>
      </ScrollView>
      <ShopFooter navigation={navigation} />
  
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  container: {
    backgroundColor: '#FCCC7C',
    padding: 10,
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
    paddingTop: 30,
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