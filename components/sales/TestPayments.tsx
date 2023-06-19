import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import dropin from 'braintree-web-drop-in';

const TestPayments = () => {
  const [dropinInstance, setDropinInstance] = useState(null);
  const dropInContainerRef = useRef(null);

  useEffect(() => {
    const createDropIn = async () => {
      try {
        const tokenResponse = await fetch('https://candii-vapes-backend.herokuapp.com/client_token');
        const { clientToken } = await tokenResponse.json();
    
        const instance = await dropin.create({
          authorization: clientToken,
          container: dropInContainerRef.current,  
          card: {
            cardholderName: {
              required: true
            }
          }
        });

        setDropinInstance(instance);
      } catch (error) {
        console.error(error);
      }
    };

    createDropIn();
  }, []);

  const onSubmit = async () => {
    if (dropinInstance) {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    try {
      if (dropinInstance) {
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
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed... please try again');
    }
  };

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.card}>
        <View ref={dropInContainerRef} style={{ marginBottom: 20 }} />
        <TouchableOpacity
            onPress={onSubmit}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Confirm and Pay</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
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
    backgroundColor: '#FCCC7C',
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
  }
});

export default TestPayments;
