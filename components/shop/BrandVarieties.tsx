import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BrandBox from './BrandBox';
import BrandData from '../data/BrandData';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductImage = string;

type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
};

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  image: ProductImage;
};

const BrandVarieties: React.FC<BrandVarietiesProps> = ({ route, navigation }) => {
  const { brand, type } = route.params; 

  useEffect(() => {
    const getLastTab = async () => {
      const lastTab = await AsyncStorage.getItem('lastTab');
      if (lastTab) {
        navigation.navigate(lastTab);
      }
    };
  
    getLastTab();
  
    const filteredData = Object.values(BrandData).filter((product: any) => product.brand === brand) as Product[];
    setVarieties(filteredData);
  }, [brand, navigation]);
  

  const [varieties, setVarieties] = useState<Product[]>([]);

  useEffect(() => {
    const filteredData = Object.values(BrandData).filter((product: any) => product.brand === brand) as Product[];
    setVarieties(filteredData);
  }, [brand]);

  const handleSelectProduct = (product: Product) => {
    switch(type) {
      case 'juice':
        navigation.navigate('JuiceProductPage', { product });
        break;
      case 'nonDisposable':
        navigation.navigate('NonDisposableProductPage', { product });
        break;
      default:
        navigation.navigate('DisposableProductPage', { product }); // Assuming 'ProductPage' corresponds to 'DisposableProductPage'
        break;
    }
  };
  
  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>{brand} Varieties</Text>
      <View style={styles.basketContent}>
      <FlatList 
              style= {{ width: '60%' }}
              showsVerticalScrollIndicator={false}
        data={varieties}
        keyExtractor={(item, index) => 'key' + index}
        bounces={false}
        ListFooterComponent={<View style={{ height: 75 }} />}
        renderItem={({ item }) => (
          <BrandBox 
            navigation={navigation} 
            quantity={0}
            onSelect={() => handleSelectProduct(item)}
            onDeselect={() => {}}
            product={item}
            selected={false}
          />
        )}
        
      />
         {/* <View style={styles.space} /> */}
      </View>

      <View style={styles.footerContainer}>
        <ShopFooter navigation={navigation}/>
      </View>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCCC7C',
      alignItems: 'center',
    },
    basketContent: {
      flex: 1,
      alignItems: 'center',
      width: '90%', // Decrease width to make BrandBox and ProductInfo components appear wider
    },
    space: {
      marginBottom: 150,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#FFFFFF',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      alignItems: 'center',
    },
    footerContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
    }
  });

export default BrandVarieties;
