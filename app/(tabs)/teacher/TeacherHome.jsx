import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const TeacherHome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/teacherbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={28} color="#304F62" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.afterHeaderImage}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Activities</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TeacherHomeWork')}
          >
            <ImageBackground
              source={require('../../assets/teachercard.jpeg')}
              style={styles.cardBackground}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>Home Works</Text>
                <Image
                  source={require('../../assets/teacherhomework.png')}
                  style={styles.cardImage}
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
              style={styles.cardBackground}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>Ratings and Feedbacks</Text>
                <Image
                  source={require('../../assets/teacherhomework.png')}
                  style={styles.cardImage}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/pinkbird.png')}
          style={styles.birdImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  fixedHeader: {
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
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  afterHeaderImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  scrollContainer: {
    paddingTop: 160,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
    marginTop:30,
    marginBottom:40
  },
  cardContainer: {
    justifyContent: 'center',
  },
  card: {
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
  cardBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  cardText: {
    fontSize: 22,
    color: '#304F62',
    fontWeight: 'bold',
    flex: 1,
  },
  cardImage: {
    width: 90,
    height: 120,
  },
  birdImage: {
    width: 110,
    height: 110,
    alignSelf: 'flex-end',
    marginTop: 9,
  },
});

export default TeacherHome;
