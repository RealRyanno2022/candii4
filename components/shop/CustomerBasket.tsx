import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BrandBox from './BrandBox';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

type ProductImage = string;

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: ProductImage;
};

type CustomerBasketProps = {
  navigation: StackNavigationProp<StackParamList, "CustomerBasket">;
};

const CustomerBasket: React.FC<CustomerBasketProps> = ({ navigation }) => {
  // Assume that you have a basket as an array of products.
  // You might replace this with actual basket data from your application state.
  const [basket, setBasket] = useState<Product[]>([]);

  const subtotal = basket.reduce((total, product) => total + product.price, 0);
  const numItems = basket.length;

  const handleCheckoutPress = () => {
    navigation.navigate('DeliveryAddress'); // Replace 'CheckoutScreen' with the actual checkout screen name in your application.
  };

  const handleShopFrontPress = () => {
    navigation.navigate('ShopFront'); // Replace 'ShopFront' with the actual shop front screen name in your application.
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>Your Basket</Text>
      {numItems > 0 ? (
        <View>
          <Text style={styles.subtotal}>Subtotal: {subtotal.toFixed(2)}</Text>
          <FlatList 
            data={basket}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BrandBox 
                navigation={navigation} 
                selected={false}
                quantity={1} // Replace with actual quantity if you have this information.
                onSelect={() => {}}
                onDeselect={() => {}}
                product={item}
              />
            )}
          />
          <TouchableOpacity style={styles.button} onPress={handleCheckoutPress}>
            <Text style={styles.buttonText}>Proceed to Checkout ({numItems} items)</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyBasket}>
          <Text style={styles.emptyText}>Your basket is currently empty. Let's get shopping!</Text>
          <TouchableOpacity style={styles.button} onPress={handleShopFrontPress}>
            <Text style={styles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
      <ShopFooter navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fb5b5a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subtotal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyBasket: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fb5b5a',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomerBasket;
