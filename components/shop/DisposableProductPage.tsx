import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type DisposableProductPageProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'DisposableProductPage'>;
}

const DisposableProductPage: React.FC<DisposableProductPageProps> = ({ navigation, route }) => {
  const { product } = route.params;

  return (
    <View style={styles.mainContainer}>
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
  
        <View style={styles.content}>
          <View style={styles.productInfo}>
            <Text style={styles.productInfoHeader}>{product.name}</Text>
          </View>
          <Image source={{uri: product.image}} style={styles.image} />
          <TouchableOpacity 
            style={styles.buyButton} 
            onPress={() => navigation.dispatch(StackActions.push('Checkout', { product }))}
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
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
  productInfo: {
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
  productInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
  },
  productInfoDescription: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  space: {
    marginBottom: 50,
  },
  buyButton: {
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
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
})

export default DisposableProductPage;