import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

type VerifyAgeProps = {
  navigation: any;
}


const VerifyAge: React.FC<VerifyAgeProps> = ({ navigation }) => {
  const [isOver18, setIsOver18] = useState(false);

  const handleVerification = (isOver18: boolean) => {
    if (isOver18) {
      navigation.navigate('PrivacyPolicy');
    } else {
      Linking.openURL('https://www.who.int/news-room/questions-and-answers/item/tobacco-e-cigarettes');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Age Verification</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleVerification(true)}
      >
        <Text style={styles.buttonText}>Yes, I'm over 18</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleVerification(false)}
      >
        <Text style={styles.buttonText}>No, I'm under 18</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerifyAge;