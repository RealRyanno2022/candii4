import React, { useState, useRef, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { TextInput as RNTextInput } from 'react-native';
import { Dropin } from 'braintree-web-drop-in';

import countryStateArray from '../data/countryStateArray';
import countriesWithCities from '../data/countriesWithCities';
import validCountries from '../data/validCountries';

import ShopHeader from '../shop/ShopHeader';
import FormInput from './FormInput';

type SubmitHandlerType = (data: UserData) => Promise<void>;

type DeliveryAddressProps = {
  navigation: any;
}

type UserData = {
  state: string;
  country: string;
  email: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  firstName: string;
  lastName: string;
};

const validateEmail = (value: string) => {
  if (value.includes('@')) return true;
  return false;
};

const validatePhoneNumber = (value: string) => {
  if (!value || value.length === 10) return true;
  return false;
};

const validateCountry = (value: string) => {
  if (validCountries.includes(value)) {
    return true;
  } else {
    return false;
  }
};

const validateStateOrCounty = (value: string, country: string) => {
  const selectedCountry = countryStateArray.countries.find(i => i.country === country);
  if (selectedCountry && selectedCountry.states.includes(value)) {
    return true;
  } else {
    return false;
  }
};

const validatePostOrEirCode = (value: string, country: string) => {
  if (country === 'Ireland') {
    if (value.length === 7 && value[0] === 'string' && value[3] === 'string') {
      return true;
    } else {
      return false;
    }
  } else {
    if (value.length === 5 || value.length === 6 /* && condition to check for alphanumeric */) {
      return true;
    } else {
      return false;
    }
  }
};

const validateCity = (value: string) => {
  const countryKeys = Object.keys(countriesWithCities) as Array<keyof typeof countriesWithCities>;
  for (const country of countryKeys) {
    if (countriesWithCities[country].includes(value)) {
      return true;
    }
  }
  return false;
};

const validateFirstName = (value: string) => {
  if (value.length < 2) {
    return false;
  } else {
    return true;
  }
};

const validateLastName = (value: string) => {
  if (value.length < 3) {
    return false;
  } else {
    return true;
  }
};


const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ navigation }) => {
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<UserData>();

  const handleSaveUserInformation: SubmitHandlerType = async (data: UserData) => {
    try {
      const response = await axios.post('https://candii-vapes-backend.herokuapp.com/save_user_information', {
        state: data.state,
        country: data.country,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        postCode: data.postCode,
        firstName: data.firstName,
        lastName: data.lastName,
      });
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    console.log(data);
    await handleSaveUserInformation(data);
    handlePayment();
  }

  const handlePayment = async () => {
    try {
      // Fetch the client token from your server
      const tokenResponse = await fetch('https://candii-vapes-backend.herokuapp.com/client_token');
      const { clientToken } = await tokenResponse.json();
  
      const dropinInstance = await Dropin.create({
        authorization: clientToken,
        container: '#dropin-container',
        card: {
          cardholderName: {
            required: true
          }
        }
      });
  
      const { nonce } = await dropinInstance.requestPaymentMethod();
  
      const paymentResponse = await fetch('https://candii-vapes-backend.herokuapp.com/execute_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodNonce: nonce,
          amount: '1.00', // Replace with the actual amount
        }),
      });
  
      if (!paymentResponse.ok) {
        throw new Error('Payment failed');
      }
  
      const { message } = await paymentResponse.json();
      console.log(message);
      navigation.navigate('ConfirmationDetails');
    } catch (error) {
      console.error(error);
      alert('Payment failed... please try again');
      navigation.navigate('ShopFront');
    }
  };

  const input1Ref = useRef<RNTextInput | null>(null);
  const input2Ref = useRef<RNTextInput | null>(null);
  const input3Ref = useRef<RNTextInput | null>(null);
  const input4Ref = useRef<RNTextInput | null>(null);
  const input5Ref = useRef<RNTextInput | null>(null);
  const input6Ref = useRef<RNTextInput | null>(null);
  const input7Ref = useRef<RNTextInput | null>(null);
  const input8Ref = useRef<RNTextInput | null>(null);

  const input1Layout = useRef<number | null>(null);
  const input2Layout = useRef<number | null>(null);
  const input3Layout = useRef<number | null>(null);
  const input4Layout = useRef<number | null>(null);
  const input5Layout = useRef<number | null>(null);
  const input6Layout = useRef<number | null>(null);
  const input7Layout = useRef<number | null>(null);
  const input8Layout = useRef<number | null>(null);

  const formFields = [
    { name: 'email', label: 'Email *', rules: { required: 'This field is required', validate: validateEmail } },
    { name: 'firstName', label: 'First name *', rules: { required: 'This field is required', validate: validateFirstName } },
    { name: 'lastName', label: 'Last name *', rules: { required: 'This field is required', validate: validateLastName } },
    { name: 'phoneNumber', label: 'Phone number *', rules: { required: 'This field is required', validate: validatePhoneNumber } },
    { name: 'city', label: 'City *', rules: { required: 'This field is required', validate: validateCity } },
    { name: 'country', label: 'Country *', rules: { required: 'This field is required', validate: validateCountry }, setCountry: true },
    { name: 'state', label: country === 'Ireland' ? 'County *' : 'State *', rules: { required: 'This field is required', validate: validateStateOrCounty } },
    { name: 'postcode', label: country === 'Ireland' ? 'Eir Code' : 'Post Code', rules: { validate: validatePostOrEirCode } },
  ];

  const handleSearch = () => {
    navigation.push('SearchProducts', { searchTerm });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (scrollViewRef.current && scrollViewRef.current.scrollTo) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <ShopHeader navigation={navigation} />
          <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={{ paddingBottom: 100 }}>
              <View style={styles.label}>
                <Text style={styles.labelText}>Delivery Address</Text>
              </View>

              {formFields.map(field => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  scrollViewRef={scrollViewRef}
                  rules={field.rules}
                  control={control} // Add control property
                  errors={errors} // Add errors property
                  setCountry={field.setCountry ? setCountry : undefined}
                />
              ))}

              <View style={styles.card}>
                <View id="dropin-container" style={{ marginBottom: 20 }} />
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)} // Pass handleSubmit as the onPress handler
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Confirm and Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <View style={styles.space}></View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// test

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 24,
  },
  asterisk: {
    fontSize: 16,
    color: 'red',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexGrow: 1,
  },
  space: {
    marginTop: 150,
  },
  card: {
    width: '90%', // Increase the width here
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '100%', // Add this style
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default DeliveryAddress;