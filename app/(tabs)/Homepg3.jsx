import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Homepg3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/home3.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Homepg2')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Homepg4')}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // Spread buttons to left and right
    width: '100%',                  // Full width to position buttons on both sides
    paddingHorizontal: 20,          // Padding for spacing from the screen edges
  },
  button1: {
    backgroundColor: '#FC9144',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '40%', // Width of the left button
  },
  button2: {
    backgroundColor: '#FFD339',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '40%', // Width of the right button
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Homepg3;
