import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const ParentHomePage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/parenthomepg.png')} // Change this to your background image
      style={styles.phpcontainer}
      resizeMode="cover"
    >
      <View style={styles.phpfixedHeader}>
        <View style={styles.phpheaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.phpafterHeaderImage}
        />
      </View>

      <View style={styles.phpwelcomeContainer}>
        <Text style={styles.phpwelcomeText}>Welcome Teacher!</Text>
      </View>

      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.phpscrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.gridContainer}>
            {[
              { title: 'Daily Updates', image: require('../../assets/updates.png'), screen: '' },
              { title: 'Activities', image: require('../../assets/activity.png'), screen: 'ParentHome' },
              { title: 'Meal Tracking', image: require('../../assets/meal.png'), screen: '' },
              { title: 'Payment Details', image: require('../../assets/payment.png'), screen: '' },
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.button} 
                onPress={() => navigation.navigate(item.screen)} // Navigate to the respective screen
              >
                <Image source={item.image} style={styles.icon} />
                <Text style={styles.phpbuttonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.phpfooterText}>© 2024 Giggles. All rights reserved.</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  phpcontainer: {
    flex: 1,
    opacity: 0.9,
  },
  phpfixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 49,
  },
  phpheaderContainer: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phpafterHeaderImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  phpwelcomeContainer: {
    marginTop: 180,
    alignItems: 'center',
    paddingBottom: 20,
  },
  
  phpscrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  phpwelcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  phpgridContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  phpbutton: {
    backgroundColor: '#96CBE9', // More opaque white background
    borderRadius: 10,
    margin: 10,
    width: 160, // Adjusted width for a better touch target
    height: 160, // Fixed height for uniformity
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    elevation: 5, // Stronger shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  phpicon: {
    width: 70, // Adjusted for better visibility
    height: 70,
    marginBottom: 5,
  },
  phpbuttonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  phpfooterText: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ParentHomePage;
