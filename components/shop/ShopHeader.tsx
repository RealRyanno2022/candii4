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
      <Header
        containerStyle={styles.headerColor}
      />
      <SearchBar
        platform="default"
        containerStyle={{ width: '100%' }}
        lightTheme
        searchIcon={{ name: 'search', size: 24 }}
        onChangeText={handleSearchTextChange}
        onClear={() => setSearchTerm('')}
        placeholder="Search..."
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

      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerColor: {     backgroundColor: '#FCCC7C' }
})


export default ShopHeader;