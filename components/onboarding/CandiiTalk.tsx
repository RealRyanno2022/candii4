import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type CandiiTalkProps = {
  navigation: any;
}

const CandiiTalk: React.FC<CandiiTalkProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.policyScrollView}>
        <Image source={require('../pictures/logosvg2.png')} style={styles.candiiLogo} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Candii: </Text>
          <Text style={styles.headerText}>The responsible vape brand</Text>
        </View>
        
        <Text style={styles.policyContent}>
          Candii is your trusted partner in a journey towards a healthier lifestyle. As a 100% Irish-owned business, we're redefining the vaping landscape by focusing on responsible vaping and being part of the solution.
        </Text>

        <Image source={require('../pictures/vapeboxfinal.png')} style={styles.candiiLogo} />
        
        <Text style={styles.policyContent}>
          We proudly collaborate with the Vape Redemption Project, paving the way for eco-consciousness by recycling vape products - an initiative that sets us apart from the rest. We're not just an online vape shop, we're a revolution that brings along a smaller carbon footprint compared to traditional vape stores.
        </Text>

        <Image source={require('../pictures/earthfinal2.gif')} style={styles.candiiLogo} />

        <Text style={styles.policyContent}>
            We support seven different languages on our platform, making it effortless for anyone to navigate our offerings.
        </Text>

        <Image source={require('../pictures/vapegood.png')} style={styles.photo2} />
        <Text style={styles.policyContent}>
        Here at Candii, our mission extends beyond selling e-cigarettes - we aim to foster a healthier lifestyle. Pioneering this drive is our selection of nicotine-free options, specifically crafted for those aiming to eliminate nicotine dependence completely.
        </Text>
        

        <Text style={styles.policyContent}>
        We provide a nicotine concentration range from 3mg to 20mg of nicotine. This provides a flexible route to gradual nicotine reduction, allowing for a smoother and more manageable transition.
        </Text>

        <Image source={require('../pictures/vapepile.png')} style={styles.photo2} />

        <Text style={styles.policyContent}>
        Contact us through Instagram!
        </Text>

        <TouchableOpacity style={styles.insta} onPress={() => Linking.openURL('https://www.instagram.com/candii.vapes/?hl=en')}>
          <Icon name="instagram" size={150} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FCCC7C',
  },
  insta: {
    alignItems: "center",
  },
  candiiLogo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  photo2: {
    height: 280,
    width: '100%',
  },
  header: {
    marginBottom: 20,
    alignItems:'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignItems:'center',
    justifyContent: 'center',
  },
  policyContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  policyScrollView: {
    flex: 1,
  },
  policyContent: {
    padding: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CandiiTalk;
