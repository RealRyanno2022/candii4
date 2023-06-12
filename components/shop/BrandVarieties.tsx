import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BrandBox from './BrandBox';
import brandData from '../data/BrandData';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
  brand: string;
};

const BrandVarieties: React.FC<BrandVarietiesProps> = ({ route, navigation }) => {
  const { brand } = route.params;

  const [varieties, setVarieties] = useState<string[]>([]);

  useEffect(() => {
    const filteredData = Object.values(brandData).filter((product) => product === brand);
    setVarieties(filteredData);
  }, [brand]);

  const handleSelect = () => {
    console.log('Selected product');
  };

  const handleDeselect = () => {
    console.log('Deselected product');
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>{brand} Varieties</Text>
      <FlatList 
        data={varieties}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={({ item }) => (
          <BrandBox 
            navigation={navigation} 
            selected={false}
            quantity={0}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
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