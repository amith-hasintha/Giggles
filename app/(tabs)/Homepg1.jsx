import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const Homepg1 = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Homepg2');  // Navigate to Homepg2 on tap
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/home1.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
});

export default Homepg1;
