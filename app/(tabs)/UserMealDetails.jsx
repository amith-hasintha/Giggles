import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView , ImageBackground} from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../configs/FirebaseConfig';
import Feather from '@expo/vector-icons/Feather';


const UserMealDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { meal } = route.params;
 

  useEffect(() => {
  
  }, []);

  
 

  return (
    <ImageBackground
      source={require('./../assets/teacherbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('UserMealList')}>
            <Feather name="arrow-left-circle" size={28} color="#304F62" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('./../assets/logo.png')}
          style={styles.afterHeaderImage}
        />
      </View>
    <View style={styles.container}>
      {/* Meal Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: meal.image }} style={styles.mealImage} />
      </View>
      <View style={styles.detailsContainer}>
      {/* Meal Information */}
      <ScrollView contentContainerStyle={styles.detailsContent}>
        <Text style={styles.mealTitle}>{meal.name}</Text>
        <Text style={styles.mealDescription}>{meal.ingredients}</Text>

        {/* Fixed Additional Information */}
        <Text style={styles.additionalInfoTitle}>Additional Information</Text>
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoText}>
            • All children's allergies are carefully monitored and accommodated by us.
          </Text>
          <Text style={styles.additionalInfoText}>
            • Meals are balanced to meet the nutritional guidelines for young children.
          </Text>
          <Text style={styles.additionalInfoText}>
            • We encourage healthy eating habits and introduce the kids to a variety of foods.
          </Text>
        </View>
        {/* Like Button at the Bottom Right Corner */}
      
      </ScrollView>

      
      </View>
    </View>
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
      container: {
          flex: 1,
        },
        imageContainer: {
          marginTop: 170,
          alignItems: 'center',
          marginVertical: 20,
        },
        mealImage: {
          width: 250,
          height: 250,
          borderRadius: 150,
          borderWidth: 3,
          borderColor: '#0C5481',
        },
        detailsContainer: {
          marginTop: -8,
          backgroundColor: '#fff',
      paddingHorizontal: 25,
      marginEnd:15,
      borderTopRightRadius: 70,
      height: 800,
      shadowColor: '#000',                // Shadow for elevation
    shadowOffset: { width: 0, height: -2 }, // Slight upward shadow
    shadowOpacity: 0.3,                 // Shadow transparency
    shadowRadius: 10,                   // Shadow blur
    elevation: 8,                       // Elevation for Android
    borderTopWidth: 2,                  // Add a subtle border at the top
    borderTopColor: '#e6e6e6',          // Light grey border color
    zIndex: 10,         
  
        },
        mealTitle: {
              marginTop: 20,
              fontSize: 26,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#0C5481',
              marginBottom: 10,
        },
        mealDescription: {
          fontFamily:'inter',
          fontSize: 20,
          marginLeft:15,
          marginRight:15,
      color: '#333',
      textAlign: 'justify',
      marginBottom: 5,
        },
        additionalInfoTitle: {
          marginTop: 20,
          fontSize: 18,
          fontWeight: 'bold',
          color: '#0C5481',
          textAlign: 'left',
          paddingHorizontal: 10,
        },
        additionalInfoContainer: {
          marginTop: 10,
          paddingHorizontal: 10,
        },
        additionalInfoText: {
          fontSize: 14,
          color: '#555',
          marginBottom: 5,
          textAlign: 'left',
        },
        
        likeButton: {
          position: 'absolute',
          marginTop: 400,
          right: 30,
          backgroundColor: '#f4f7fa',
          borderRadius: 30,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
          zIndex: 1, 
        },
      
  });
  
  export default UserMealDetail;
  
