import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BrandBox from './BrandBox';
import BrandData from '../data/BrandData';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  const { brand, type } = route.params; // Corrected this line

  const [varieties, setVarieties] = useState<Product[]>([]);

  useEffect(() => {
    console.log("Brand from route parameters:", brand);
    const filteredData = Object.values(BrandData).filter((product: any) => product.brand === brand) as Product[];
    setVarieties(filteredData);
    console.log("Filtered data for brand:", filteredData);
  }, [brand]);

  const handleSelect = () => {
    console.log('Selected product');
  };

  const handleDeselect = () => {
    console.log('Deselected product');
  };

  const handleSelectProduct = (product: Product) => {
    switch(type) {
      case 'juice':
        navigation.navigate('JuiceProductPage', { product });
        break;
      case 'nonDisposable':
        navigation.navigate('NonDisposableProductPage', { product });
        break;
      default:
        navigation.navigate('ProductPage', { product });
        break;
    }
  };
  
  

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>{brand} Varieties</Text>
      <FlatList 
        data={varieties}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => (
          <BrandBox 
            navigation={navigation} 
            selected={false}
            quantity={0}
            onSelect={() => handleSelectProduct(item)}
            onDeselect={handleDeselect}
            product={item}
          />
        )}
      />
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
});

export default BrandVarieties;
