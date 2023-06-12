import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type LanguageSelectProps = {
    navigation: NavigationProp<StackParamList>;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    // You can navigate to the VerifyAge component here or perform any other actions based on the selected language
    navigation.dispatch(StackActions.push("VerifyAge"));
  };

  const languageData = [
    { language: 'English', flag: require('../pictures/british-flag.png') },
    { language: 'Irish', flag: require('../pictures/irish-flag.png') },
    { language: 'Chinese', flag: require('../pictures/chinese-flag.png') },
    { language: 'Lithuanian', flag: require('../pictures/lithuanian-flag.png') },
    { language: 'Spanish', flag: require('../pictures/spanish-flag.png') },
    { language: 'Polish', flag: require('../pictures/polish-flag.png') },
    { language: 'French', flag: require('../pictures/french-flag.png') },
  ];

  const renderLanguageButtons = () => {
    return languageData.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.flagButton}
        onPress={() => handleLanguageSelect(item.language)}
      >
        <Image source={item.flag} style={styles.flagImage} />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.typingText}>What language do you speak?</Text>
      <View style={styles.flagContainer}>{renderLanguageButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingText: {
    fontSize: 24,
    marginBottom: 20,
  },
  flagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  flagButton: {
    padding: 10,
    borderRadius: 5,
  },
  flagImage: {
    width: 40,
    height: 40,
  },
});

export default LanguageSelect;