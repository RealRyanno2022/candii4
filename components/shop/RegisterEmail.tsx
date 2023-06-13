import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

type RegisterEmailProps = {
  navigation: StackNavigationProp<StackParamList, 'RegisterEmail'>;
};

const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleAddPress = () => {
    // TODO: add email to your email list, you might want to update your application state here.
    navigation.goBack(); // go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <Text style={styles.title}>Choose an Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.buttonText}>Add Email</Text>
      </TouchableOpacity>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
    padding: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterEmail;
