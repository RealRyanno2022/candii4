import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type FormScreenProps = {
  navigation: any;
};

const FormScreen: React.FC<FormScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleContinue = () => {
    let isValid = true;
    let errors = { name: '', email: '' };

    if (name.length < 2) {
      errors.name = 'Please enter a valid name';
      isValid = false;
    }
    if (!email.includes('@')) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    setErrors(errors);

    if (isValid) {
      navigation.navigate('ShopFront');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Registration</Text>
        <Image source={require('../pictures/largepic.png')} style={styles.largeImage} />
        <View style={styles.instagramInfo}>
          <Text style={styles.instagramText}>See our Instagram for information on how you could win a whole load of vape by registering!</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/candii.vapes/?hl=en')}>
            <Icon name="instagram" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
        />
        {errors.name.length > 0 && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.inputLabel}>E-mail:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
        />
        {errors.email.length > 0 && <Text style={styles.errorText}>{errors.email}</Text>}

        <TouchableOpacity
          style={[styles.continueButton, name && email && styles.continueButtonActive]}
          onPress={handleContinue}
          disabled={!name || !email}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    padding: 20,
  },
  largeImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  instagramInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  instagramText: {
    flex: 1,
    marginRight: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: 'white',
  },
  inputLabel: {
    width: '100%',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  continueButton: {
    marginTop: 20,
    width: 120,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9A9A9',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  continueButtonActive: {
    backgroundColor: '#D3D3D3',
  },
});

export default FormScreen;