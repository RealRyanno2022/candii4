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
  const { brand, type } = route.params; 

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
      <FlatList 
        data={varieties}
        keyExtractor={(item, index) => 'key' + index}
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
      <ShopFooter navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
