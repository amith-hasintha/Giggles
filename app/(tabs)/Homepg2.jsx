import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Homepg2 = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate('Homepg3'); // Navigate to Homepg3 on button press
  };

  return (
    <View style={styles.hocontainer}>
      <ImageBackground
        source={require('../assets/home2.png')}
        style={styles.hobackgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.hobutton} onPress={handleButtonPress}>
          <Text style={styles.hobuttonText}>Click Me</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  hocontainer: {
    flex: 1,
  },
  hobackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  hobutton: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom
    right: 20,  // Distance from the right
    backgroundColor: '#FFD339',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  hobuttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Homepg2;
