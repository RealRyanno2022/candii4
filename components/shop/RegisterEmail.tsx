import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterEmailProps = {
  navigation: StackNavigationProp<StackParamList, 'RegisterEmail'>;
};

const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationInProcess, setVerificationInProcess] = useState(false);
  const [addedEmail, setAddedEmail] = useState([]);
  const [verificationEmail, setVerificationEmail] = useState('');


  useEffect(() => {
    const getEmails = async () => {
      const storedEmails = await AsyncStorage.getItem('emails');
      if (storedEmails !== null) {
        setAddedEmail(JSON.parse(storedEmails));
      }
    };

    getEmails();
  }, []);

  useEffect(() => {
    const storeEmails = async () => {
      await AsyncStorage.setItem('emails', JSON.stringify(addedEmail));
    };

    storeEmails();
  }, [addedEmail]);

  const handleAddPress = () => {
    if (email && !verificationInProcess && addedEmail.length < 3) {
      setAddedEmail(prev => [...prev, email]);
      setVerificationEmail(email);
      setEmail('');
      setVerificationInProcess(true);
      Alert.alert('A six-digit verification code has been sent to your e-mail address, if it exists.');
    } else if (verificationInProcess) {
      Alert.alert('You must first verify your email');
    } else if (addedEmail.length >= 3) {
      Alert.alert('You can only add a maximum of 3 emails');
    }
  };
  

  const handleDeletePress = (emailToDelete: string) => {
    setShowModal(true);
    handleConfirmDelete(emailToDelete);
  };

  const handleConfirmDelete = (emailToDelete: string) => {
    setAddedEmail(prev => prev.filter(email => email !== emailToDelete));
    setShowModal(false);
  };

  const verificationCode2 = '123456';

  const handleVerify = () => {
  if (verificationCode === verificationCode2) {
    setVerificationInProcess(false);
    setVerificationEmail('');
    Alert.alert('Success!', 'Your e-mail has been verified.');
  } else {
    Alert.alert('Verification code is incorrect. Please try again.');
  }
  setVerificationCode('');
  };


  const handlePressSpinner = () => {
    Alert.alert('Check your e-mail for a 6-digit code, especially your spam folder.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShopHeader navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Choose an Email</Text>
        {addedEmail.map((email, index) => (
          <View key={index} style={styles.emailContainer}>
            {verificationInProcess && email === verificationEmail ? (
              <TouchableOpacity onPress={handlePressSpinner}>
                <ActivityIndicator size="small" color="#FF6347" />
              </TouchableOpacity>
            ) : (
              <AntDesign name="checkcircle" size={24} color="green" />
            )}
            <Text style={styles.addedEmail}>{email}</Text>
            <TouchableOpacity onPress={() => handleDeletePress(email)}>
              <Icon name="times" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>
        ))}
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
        {verificationInProcess && (
          <>
            <Text style={styles.title}>Enter your six digit code here:</Text>
            <TextInput
              style={styles.input}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="6-Digit Code"
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this email?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={() => handleConfirmDelete(email)}>
                <Text style={styles.buttonText}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setShowModal(false)}>
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ShopFooter navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  addedEmail: {
    marginHorizontal: 10,
    color: 'white',
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
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default RegisterEmail;
