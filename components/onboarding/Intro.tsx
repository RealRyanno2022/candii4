import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

type IntroProps = {
  navigation: any;
}

const Intro: React.FC<IntroProps> = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const scrollValue = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 0.8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setLoadingVisible(true);
    }, 3500);

    setTimeout(() => {
      Animated.timing(scrollValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 4000);

    setTimeout(() => {
      navigation.navigate('LanguageSelect');
    }, 2000);  // Adjust this line
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { transform: [{ scale: scaleValue }], marginBottom: 40 }]}>
        Candii
      </Animated.Text>
      <View style={styles.space} />
      <View style={styles.placeholder}>
        {loadingVisible && <ActivityIndicator style={{marginTop: 20}} size="large" color="#1F1F1F" />}
      </View>
      <View style={styles.space} />
      <Animated.View style={{position: 'absolute', width: '80%', left: scrollValue, alignSelf: 'center'}}>
        <Text style={styles.subText}>Disposable e-cigarettes and e-juice</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    marginTop: 50,
  },
  text: {
    color: '#1F1F1F',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subText: {
    color: '#1F1F1F',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    height: 50,
  },
});

export default Intro;