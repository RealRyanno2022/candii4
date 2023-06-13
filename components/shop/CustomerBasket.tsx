import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import BrandBox from './BrandBox';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

type ProductImage = string;

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: ProductImage;
};

type CustomerBasketProps = {
  navigation: StackNavigationProp<StackParamList, 'CustomerBasket'>;
  email: string;
};

const CustomerBasket: React.FC<CustomerBasketProps> = ({ navigation, email }) => {
  const [basket, setBasket] = useState<Product[]>([]);
  const subtotal = basket.reduce((total, product) => total + product.price, 0);
  const numItems = basket.length;

  const handleCheckoutPress = () => {
    navigation.navigate('DeliveryAddress');
  };

  const handleShopFrontPress = () => {
    navigation.navigate('ShopFront');
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Your Basket</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>
              {email ? `For: ${email}` : 'NO EMAIL GIVEN'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterEmail')}>
              <View style={styles.addIconContainer}>
                <Icon name="plus" size={15} color="white" />
              </View>
            </TouchableOpacity>
          </View>
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
                    quantity={1}
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
              <Text style={styles.emptyText}>Your basket is currently empty.</Text>
              <Text style={styles.emptyText}>Let's get shopping!</Text>
              <TouchableOpacity style={styles.button} onPress={handleShopFrontPress}>
                <Text style={styles.buttonText}>Start Shopping</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtotal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyBasket: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    flex: 1,
  }
});

export default CustomerBasket;