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
  route: RouteProp<StackParamList,'SubSignUp'>;
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
        <Text style={styles.subtitle}>Choose a Subscription</Text>
        <View style={styles.subscriptionOptions}>
          <TouchableOpacity
            style={[
              styles.subscriptionOption,
              subscriptionType === 'monthly' && styles.selectedSubscription,
            ]}
            onPress={() => handleSubscriptionTypeChange('monthly')}
          >
            <Text style={styles.subscriptionOptionText}>Monthly</Text>
            <Text style={styles.subscriptionOptionPrice}>One juice of your choice, each week!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subscriptionOption,
              subscriptionType === 'yearly' && styles.selectedSubscription,
            ]}
            onPress={() => handleSubscriptionTypeChange('yearly')}
          >
            <Text style={styles.subscriptionOptionText}>Yearly</Text>
            <Text style={styles.subscriptionOptionPrice}>A vape every week of the year!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.dispatch(StackActions.push("SubVapeScreen"))}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>What do I get?</Text>
            <Text style={styles.subscriptionInfoDescription}>
            Get a juice of your choice each week, hassle free!
            </Text>
        </View>
        <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>Why Vape Pass?</Text>
            <Text style={styles.subscriptionInfoDescription}>
            Save a fortune on shipping and have your flavours delivered automatically. You can cancel your subscription at any time.
            </Text>
        </View>
        <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>Can I change flavours?</Text>
            <Text style={styles.subscriptionInfoDescription}>
            Of course! You can change your flavours at any time.
            </Text>
        </View>
        <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>What varieties are there?</Text>
            <Text style={styles.subscriptionInfoDescription}>
            We offer all of our disposable vape varieties and will allow a similiar pass for e-juice in the future.
            </Text>
        </View>
      <View style={styles.space}></View>
      </View> 
     
    </ScrollView>
    <ShopFooter navigation={navigation}  />
    </View>
  );
};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },
    container: {
        backgroundColor: '#F2F2F2',
        padding: 10,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
    },
    image: {
        height: 225,
        width: '100%',
        borderRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      fontFamily: 'OpenSans-Bold',
      marginBottom: 10,
    },
    subscriptionInfo: {
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
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
        color: '#666',
        fontFamily: 'OpenSans-Regular',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        fontFamily: 'OpenSans-Bold',
    },
    subscriptionOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    space: {
        marginBottom: 50,
    },
    subscriptionOption: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 20,
        width: '48%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedSubscription: {
        borderColor: '#FF6347',
        borderWidth: 2,
    },
    subscriptionOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'OpenSans-Regular',
    },
    subscriptionOptionPrice: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'OpenSans-Regular',
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityButton: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        width: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    quantityButtonText: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'OpenSans-Regular',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 20,
        fontFamily: 'OpenSans-Bold',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 20,
        fontFamily: 'OpenSans-Bold',
    },
    signUpButton: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
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
    footerText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'OpenSans-Regular',
    },
});
  
  export default SubSignUp;
