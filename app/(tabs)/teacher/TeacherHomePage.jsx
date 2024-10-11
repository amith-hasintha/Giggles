import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const TeacherHomePage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/teacherhomepg.png')} // Change this to your background image
      style={styles.thpcontainer}
      resizeMode="cover"
    >
      <View style={styles.thpfixedHeader}>
        <View style={styles.thpheaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.thpafterHeaderImage}
        />
      </View>

      <View style={styles.thpwelcomeContainer}>
        <Text style={styles.thpwelcomeText}>Welcome Teacher!</Text>
      </View>

      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.thpscrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.thpgridContainer}>
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
                <Text style={styles.thpbuttonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.thpfooterText}>© 2024 Giggles. All rights reserved.</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  thpcontainer: {
    flex: 1,
    opacity: 0.9,
  },
  thpfixedHeader: {
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
  thpheaderContainer: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thpafterHeaderImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  thpwelcomeContainer: {
    marginTop: 180,
    alignItems: 'center',
    paddingBottom: 20,
  },
  
  thpscrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  thpwelcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  thpgridContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  thpbutton: {
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
  thpicon: {
    width: 70, // Adjusted for better visibility
    height: 70,
    marginBottom: 5,
  },
  thpbuttonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  thpfooterText: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TeacherHomePage;
