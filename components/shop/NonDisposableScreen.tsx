import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type NonDisposableScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
};

const NonDisposableScreen: React.FC<NonDisposableScreenProps> = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandPress = (brandName: string) => {
    navigation.dispatch(StackActions.push('BrandVarieties', { brandName }));
  };



  const handleSearch = () => {
    navigation.dispatch(StackActions.push('SearchProducts', { searchTerm }));
  };

  const brands = [
    { name: "Flexus", image: require('../pictures/flexus2.png') },
    { name: "DragX", image: require('../pictures/dragx.png') },
    { name: "Favostix", image: require('../pictures/favostix2.png') },
    { name: "PocketX", image: require('../pictures/pocketx.png') },
    { name: "Smok", image: require('../pictures/smok.png') },
    { name: "TeknoKit", image: require('../pictures/teknokit.png') },
  ];

  return (
    <View style={styles.container}>
     <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
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
        </View>
      </ScrollView>
      <ShopFooter navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FB5B5A',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
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
  buffer: {
    marginBottom: 150,
  },
});

export default NonDisposableScreen;