import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Homepg2 = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate('Homepg3'); // Navigate to Homepg3 on button press
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/home2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom
    right: 20,  // Distance from the right
    backgroundColor: '#FFD339',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Homepg2;
