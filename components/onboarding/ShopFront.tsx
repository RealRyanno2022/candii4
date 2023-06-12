import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Header, SearchBar, Icon } from 'react-native-elements';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';

type ShopFrontProps = {
  navigation: NavigationProp<StackParamList>;
}

const ShopFront: React.FC<ShopFrontProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandPress = (productType: string) => {
    if (productType === 'Disposables') {
      navigation.navigate('VapeScreen');
    }
    if (productType === 'Juice') {
      navigation.navigate('JuiceScreen');
    } 
  };

  const { styles } = navigation.screenProps;

  return (
    <View style={{backgroundColor: styles.background}}>
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} stickyHeaderIndices={[1]}>
        <View style={styles.cardContainer}>
          <View style={styles.space} />
          <TouchableOpacity
            id="disposables"
            style={styles.card}
            onPress={() => handleBrandPress('Disposables')}
          >
            <Image 
              source={require('my-project/components/pictures/VapePics/elfbar-fotor-bg-remover-20230514115238.png')} 
              style={styles.imageStyle}
            />
            <Text style={styles.cardText}>Disposables</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            id="juice"
            style={styles.card}
            onPress={() => handleBrandPress('Juice')}
          >
            <Image 
              source={require('my-project/components/pictures/VapePics/juice-fotor-bg-remover-20230514115248.png')} 
              style={styles.imageStyle}
            />
            <Text style={styles.cardText}>Juice</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
       
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  space: {
    marginTop: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  imageStyle: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default ShopFront;