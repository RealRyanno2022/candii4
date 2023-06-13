import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type VapeScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
  brand: string;
}

const VapeScreen: React.FC<VapeScreenProps> = ({ navigation }) => {

  const brands = [
    { name: "ElfaBar", image: require('../pictures/DisposablePics/elfabar.png') },
    { name: "JewelMini", image: require('../pictures/DisposablePics/jewelmini.png') },
    { name: "LostMary", image: require('../pictures/DisposablePics/lostmary.png') },
    { name: "ElfBar", image: require('../pictures/VapePics/elfbar.png') },
    { name: "IVGBar", image: require('../pictures/DisposablePics/ivgbar.png') },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandPress = (brand: string) => {
    navigation.dispatch(StackActions.push('BrandVarieties', { brand }));
  };

  const handleBackPress = () => {
    navigation.pop();
  }

  const handleSearch = () => {
    navigation.dispatch(StackActions.push('SearchProducts', { searchTerm }));
  }

  return (
    <View style={styles.container}>
     <ShopHeader navigation={navigation} />
      <ScrollView>
        <View style={styles.cardContainer}>
          {brands.map(brand => (
            <TouchableOpacity
              key={brand.name}
              style={styles.card}
              onPress={() => handleBrandPress(brand.name)}
            >
              <Image style={styles.image} source={brand.image}></Image>
              <Text style={styles.cardText}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleBackPress()}
          >
            <Image style={styles.image} source={require('../pictures/goback.png')}></Image>
            <Text style={styles.cardText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ShopFooter navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCCC7C',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FB5B5A',
  },
  image: {
      width: '100%', 
      height: 100,
      resizeMode: 'contain',
      marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: 20,
  },
  card: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VapeScreen;