import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../configs/FirebaseConfig';


const MealDetail = () => {
  const route = useRoute();
  const { meal } = route.params;
  const userId = 'sampleUserId'; // Replace with the actual user ID if you have authentication setup
  const [likes, setLikes] = useState(meal.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, []);

  // Check if the meal is liked by this user
  const checkIfLiked = async () => {
    try {
      const mealRef = doc(db, 'meals', meal.id);
      const mealSnapshot = await getDoc(mealRef);

      if (mealSnapshot.exists()) {
        const mealData = mealSnapshot.data();
        // Check if `likedBy` field includes the current user ID
        setIsLiked(mealData.likedBy && mealData.likedBy.includes(userId));
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  // Function to handle like button press
  const handleLike = async () => {
    try {
      const mealRef = doc(db, 'meals', meal.id);
      let newLikes = likes;
      let newLikedBy = meal.likedBy || []; // Initialize likedBy array

      // Toggle like and unlike
      if (isLiked) {
        // User is unliking the meal
        newLikes -= 1;
        newLikedBy = newLikedBy.filter((id) => id !== userId); // Remove userId from likedBy array
      } else {
        // User is liking the meal
        newLikes += 1;
        newLikedBy.push(userId); // Add userId to likedBy array
      }

      setLikes(newLikes); // Update the local state with the new likes count
      setIsLiked(!isLiked); // Toggle the liked state

      // Update Firestore with the new likes count and likedBy array
      await updateDoc(mealRef, {
        likes: newLikes,
        likedBy: newLikedBy,
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      Alert.alert('Error updating likes. Please try again.');
    }
  };

  return (
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

      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <AntDesign
          name={isLiked ? 'like1' : 'like2'}
          size={24}
          color={isLiked ? 'black' : 'black'} // Change color based on liked state
        />
        
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7fa',
      },
      imageContainer: {
        marginTop: 80,
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
        marginTop: 20,
        backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginEnd:5,
    borderTopRightRadius: 50,
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

export default MealDetail;
