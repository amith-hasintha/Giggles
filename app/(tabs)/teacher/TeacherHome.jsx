import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const TeacherHome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/teacherbackground.png')}
      style={styles.thbackground}
      resizeMode="cover"
    >
      <View style={styles.thfixedHeader}>
        <View style={styles.thheaderContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
            <Feather name="arrow-left-circle" size={28} color="#304F62" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.thafterHeaderImage}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.thpageTitle}>Activities</Text>
        <View style={styles.thcardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TeacherHomeWork')}
          >
            <ImageBackground
              source={require('../../assets/teachercard.jpeg')}
              style={styles.thcardBackground}
            >
              <View style={styles.thcardContent}>
                <Text style={styles.thcardText}>Home Works</Text>
                <Image
                  source={require('../../assets/teacherhomework.png')}
                  style={styles.thcardImage}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Feedbacks')}
          >
            <ImageBackground
              source={require('../../assets/teachercard.jpeg')}
              style={styles.thcardBackground}
            >
              <View style={styles.thcardContent}>
                <Text style={styles.thcardText}>Ratings and Feedbacks</Text>
                <Image
                  source={require('../../assets/teacherhomework.png')}
                  style={styles.thcardImage}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/pinkbird.png')}
          style={styles.thbirdImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  thbackground: {
    flex: 1,
  },
  thfixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 49,
  },
  thheaderContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thafterHeaderImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  thscrollContainer: {
    paddingTop: 160,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  thpageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
    marginTop:30,
    marginBottom:40,
    fontFamily:'Poppins-bold'
  },
  thcardContainer: {
    justifyContent: 'center',
  },
  thcard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  thcardBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  thcardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  thcardText: {
    fontSize: 22,
    color: '#304F62',
    fontWeight: 'bold',
    flex: 1,
    fontFamily:'Poppins-medium'
  },
  thcardImage: {
    width: 90,
    height: 120,
  },
  thbirdImage: {
    width: 110,
    height: 110,
    alignSelf: 'flex-end',
    marginTop: 9,
  },
});

export default TeacherHome;
