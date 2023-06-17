import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import BrandBox from './BrandBox';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurchaseInfo from './PurchaseInfo';

type ProductImage = string;

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  image: ProductImage;
};

type CustomerBasketProps = {
  navigation: StackNavigationProp<StackParamList, 'CustomerBasket'>;
  route: RouteProp<StackParamList, 'CustomerBasket'>; // add this line
};

type BasketItem = {
  product: any;
  quantity: number;
}


const CustomerBasket: React.FC<CustomerBasketProps> = ({ navigation, route}) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [basket, setBasket] = useState<Product[]>([]);
  const subtotal = basket.reduce((total, product) => total + product.price, 0);
  const numItems = basket.length;
  const email = route.params?.email || '';



  useEffect(() => {
    const loadBasket = async () => {
      try {
        const storedBasket = await AsyncStorage.getItem('basket');
        
        if (storedBasket !== null) {
          setBasket(JSON.parse(storedBasket));
        }
      } catch (error) {
        console.error('Failed to load the basket.', error);
      }
    };

    loadBasket();
  }, []);


  const handleEditAddressPress = () => {
    navigation.navigate('EditEmailDeliveryAddress');
  };

  const handleCheckoutPress = () => {
    navigation.navigate('DeliveryAddress');
  };

  const handleShopFrontPress = () => {
    navigation.navigate('ShopFront');
  };

  useEffect(() => {
    if (route.params?.item) {
      setBasket(oldBasket => [...oldBasket, route.params.item]);
    }
  }, [route.params?.item]);


  const increaseQuantity = (index: number) => {
    const newBasketItems = [...basketItems];
    newBasketItems[index].quantity += 1;
    setBasketItems(newBasketItems);
  };

  const decreaseQuantity = (index: number) => {
    const newBasketItems = [...basketItems];
    newBasketItems[index].quantity -= 1;
    if (newBasketItems[index].quantity === 0) {
      newBasketItems.splice(index, 1);
    }
    setBasketItems(newBasketItems);
  };

  const renderBasketItem = ({ item, index }: { item: Product, index: number }) => (
    <View>
      <BrandBox
        navigation={navigation}
        quantity={1}
        onSelect={() => {}}
        onDeselect={() => {}}
        product={item}
        selected={true}  // Always selected in basket
      />
      <PurchaseInfo quantity={1} subtotal={item.price} />
    </View>
  );


  // const handleSelectProduct = (product: Product) => {
  //   switch(type) {
  //     case 'juice':
  //       navigation.navigate('JuiceProductPage', { product });
  //       break;
  //     case 'nonDisposable':
  //       navigation.navigate('NonDisposableProductPage', { product });
  //       break;
  //     default:
  //       navigation.navigate('DisposableProductPage', { product }); // Assuming 'ProductPage' corresponds to 'DisposableProductPage'
  //       break;
  //   }
  // };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Your Basket</Text>
        {numItems > 0 ? (
          <View style={styles.basketContent}>
            <View style={styles.checkoutInfo}>
              <Text style={styles.subtotal}>Subtotal: €{subtotal.toFixed(2)}</Text>
              <TouchableOpacity style={styles.button} onPress={handleCheckoutPress}>
                <Text style={styles.buttonText}>Proceed to Checkout ({numItems} items)</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={basket}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderBasketItem}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
      <View style={styles.footerContainer}>
        <ShopFooter navigation={navigation} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: '#FCCC7C',
  },
  basketContent: {
    alignItems: 'center',
    width: '100%', // Decrease width to make BrandBox and ProductInfo components appear wider
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  subtotal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center', // Align text to center
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
  checkoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'center', // Align items to center
  },
  footerContainer: {
    position: 'absolute', // make the ShopFooter fixed
    left: 0,
    right: 0,
    bottom: 0,
  },
  space: {
    marginBottom: 100,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#FCCC7C',
  //   justifyContent: 'space-between', // to push footer at the bottom
  // },
  content: {
    width: '100%', // to take full width
  },
  basketContent: {
    alignItems: 'center',
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
  boldBasketText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
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
});


export default CustomerBasket;