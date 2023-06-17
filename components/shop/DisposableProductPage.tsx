import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type DisposableProductPageProps = {
  route: RouteProp<StackParamList, 'DisposableProductPage'>;
  navigation: StackNavigationProp<StackParamList, 'DisposableProductPage'>;
};

const DisposableProductPage: React.FC<DisposableProductPageProps> = ({ route, navigation }) => {
  const { product } = route.params;

  useEffect(() => {
    console.log('DisposableProductPage is being rendered');
    loadProductData();
  }, []);

  const loadProductData = async () => {
    const productData = await AsyncStorage.getItem('product');
    if (productData !== null) {
      setProduct(JSON.parse(productData));
    } else {
      setProduct(null);
    }
  }

  const reloadData = () => {
    navigation.navigate('ShopFront');
  }

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>Disposable Product</Text>
      <View style={styles.productContent}>
        {product ? (
          <Text>{product.name}</Text>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>You haven't loaded this product.</Text>
            <TouchableOpacity style={styles.button} onPress={reloadData}>
              <Text style={styles.buttonText}>Reload</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footerContainer}>
        <ShopFooter navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  productContent: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerContainer: {
    flex: 1,
  },
});

export default DisposableProductPage;