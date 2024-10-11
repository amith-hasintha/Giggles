import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const TeacherHomePage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/teacherhomepg.png')} // Change this to your background image
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.afterHeaderImage}
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Teacher!</Text>
      </View>

      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.gridContainer}>
            {[
              { title: 'Daily Updates', image: require('../../assets/updates.png'), screen: 'DisplayDailyUpdates' },
              { title: 'Activities', image: require('../../assets/activity.png'), screen: 'TeacherHome' },
              { title: 'Meal Tracking', image: require('../../assets/meal.png'), screen: 'MealList' },
              { title: 'Payment Details', image: require('../../assets/payment.png'), screen: 'DisplayPayments' },
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.button} 
                onPress={() => navigation.navigate(item.screen)} // Navigate to the respective screen
              >
                <Image source={item.image} style={styles.icon} />
                <Text style={styles.buttonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerText}>© 2024 Giggles. All rights reserved.</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.9,
  },
  fixedHeader: {
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
  headerContainer: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  afterHeaderImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  welcomeContainer: {
    marginTop: 180,
    alignItems: 'center',
    paddingBottom: 20,
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  gridContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  button: {
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
  icon: {
    width: 70, // Adjusted for better visibility
    height: 70,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TeacherHomePage;
