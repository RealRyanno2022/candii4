import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Queries from '../unused/account/Queries';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import LanguageSelect from '../onboarding/LanguageSelect';

type QueryLanguageSelectorProps = {
  navigation: StackNavigationProp<StackParamList, 'QueryLanguageSelector'>;
};

const QueryLanguageSelector: React.FC<QueryLanguageSelectorProps> = ({ navigation }) => {





  const handleLanguageSelectPress = () => {
    navigation.navigate("LanguageSelect");
  }





  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.subscriptionInfo}>
          <TouchableOpacity style={styles.button} onPress={handleLanguageSelectPress}>
            <Text style={styles.buttonText}>Select Language</Text>
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
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QueryLanguageSelector;