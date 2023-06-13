import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image } from 'react-native';

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
        
        <Text style={styles.policyContent}>
          We proudly collaborate with the Vape Redemption Project, paving the way for eco-consciousness by recycling vape products - an initiative that sets us apart from the rest. We're not just an online vape shop, we're a revolution that brings along a smaller carbon footprint compared to traditional vape stores.
        </Text>

        <Text style={styles.policyContent}>
          Inclusivity is in our DNA. We welcome individuals from diverse backgrounds, supporting seven different languages on our platform, making it effortless for anyone to navigate our offerings. Our goal is to make the vaping experience positive, transparent, and sustainable, transforming perceptions and fostering a community that is united by a common goal.
        </Text>

        <Text style={styles.policyContent}>
          We are actively seeking to work with charities who share our mission of promoting responsible vaping and smoking cessation. Some potential collaborations could include Action on Smoking and Health (ASH), Cancer Research UK, or the American Lung Association - organizations that actively work to eliminate smoking-related illnesses and advocate for healthier lifestyles. By collaborating with these charities, we can jointly work towards a world where smoking is a thing of the past and vaping is done responsibly.
        </Text>
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
  candiiLogo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
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
