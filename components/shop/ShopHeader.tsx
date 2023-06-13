import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Header, Icon, SearchBar } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';

type ShopHeaderProps = {
  navigation: NavigationProp<StackParamList>;
};

const ShopHeader: React.FC<ShopHeaderProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearchTextChange = () => {
    // Implement your logic here to handle the text change
  };

  return (
    <View style={styles.headerColor}>
      <SearchBar
        platform="default"
        containerStyle={styles.searchBarContainer}
        lightTheme
        searchIcon={{ name: 'search', size: 24 }}
        onChangeText={handleSearchTextChange}
        onClear={() => setSearchTerm('')}
        placeholder="Search..."
        style={styles.searchBar}
        value={searchTerm}
        loadingProps={{}} // Add empty object for loadingProps
        showLoading={false} // Set showLoading to false
        round={false} // Set round to false
        onFocus={() => {}} // Add empty function for onFocus
        onBlur={() => {}} // Add empty function for onBlur
        onCancel={() => {}}
        cancelButtonTitle="" // Provide a value for cancelButtonTitle
        cancelButtonProps={{}} // Add empty object for cancelButtonProps
        clearIcon={{ name: 'clear' }} // Provide a valid icon name for clearIcon
        showCancel={false} // Set showCancel to false
        inputContainerStyle={styles.inputContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerColor: {     
    backgroundColor: '#FFFFFF',
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