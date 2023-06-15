import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image, // Import Image component
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Queries from '../unused/account/Queries';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

type QueryLanguageSelectorProps = {
  navigation: StackNavigationProp<StackParamList, 'QueryLanguageSelector'>;
};

const QueryLanguageSelector: React.FC<QueryLanguageSelectorProps> = ({ navigation }) => {
  const route = useRoute();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [flag, setFlag] = useState(require('../pictures/british-flag.png'));

  const languageData = [
    { language: 'English', flag: require('../pictures/british-flag.png'), translation: 'Select a language' },
    { language: 'Irish', flag: require('../pictures/irish-flag.png'), translation: 'Roghnaigh teanga' },
    { language: 'Chinese', flag: require('../pictures/chinese-flag.png'), translation: '选择语言' },
    { language: 'Lithuanian', flag: require('../pictures/lithuanian-flag.png'), translation: 'Pasirinkite kalbą' },
    { language: 'Spanish', flag: require('../pictures/spanish-flag.png'), translation: 'Seleccione un idioma' },
    { language: 'Polish', flag: require('../pictures/polish-flag.png'), translation: 'Wybierz język' },
    { language: 'French', flag: require('../pictures/french-flag.png'), translation: 'Sélectionnez une langue' },
  ];

  useEffect(() => {
    if (route.params?.selectedLanguage) {
      const selectedLang = languageData.find(lang => lang.language === route.params.selectedLanguage);
      if (selectedLang) {
        setSelectedLanguage(selectedLang.language);
        setFlag(selectedLang.flag);
      }
    }
  }, [route.params?.selectedLanguage]);

  const handleLanguageSelectPress = () => {
    navigation.navigate("LanguageSelect", { fromQueryLanguageSelector: true });
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={styles.subscriptionInfo}>
        <TouchableOpacity style={styles.button} onPress={handleLanguageSelectPress}>
          <Text style={styles.buttonText}>{selectedLanguage}</Text>
          <Image source={flag} style={styles.flag} />
        </TouchableOpacity>
        </View>
        <Queries navigation={navigation} />
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  content: {
    flexGrow: 1,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#FCCC7C',
  },
  button: {
    flexDirection: 'row', // Add this line
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10, // Add space between the text and the flag
  },
  flagContainer: {
    marginLeft: 10,
  },
  flag: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default QueryLanguageSelector;
