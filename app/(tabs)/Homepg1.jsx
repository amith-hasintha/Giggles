import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const Homepg1 = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Homepg2');  // Navigate to Homepg2 on tap
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.hcontainer}>
        <ImageBackground
          source={require('../assets/home1.png')}
          style={styles.hbackgroundImage}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  hcontainer: {
    flex: 1,
  },
  hbackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Homepg1;
