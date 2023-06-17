import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, SearchBar, Image } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';

type ShopHeaderProps = {
  navigation: NavigationProp<StackParamList>;
};

const ShopHeader: React.FC<ShopHeaderProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTextChange = (newTerm: string) => {
    // Implement your logic here to handle the text change
    setSearchTerm(newTerm);
  };

  const handleSearchFocus = () => {
    // When search bar is focused, navigate to SearchProducts screen
    navigation.navigate('SearchProducts');
  };

  return (
    <View style={styles.headerColor}>
    <View style={styles.container}>
      <Image source={require('../pictures/icon.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerColor: {     
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 100,
    width: 100,

  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: ''
  },
  searchBarContainer: { 
    width: '100%', 
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'transparent', // Remove the border at the bottom
    borderTopColor: 'transparent', // Remove the border at the top
  },
  inputContainerStyle: {
    backgroundColor: '#FFFFFF', // Set the background color of the input field
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
  },
})


export default ShopHeader;