import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Icon library for Like button
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Firestore imports
import { db } from '../configs/FirebaseConfig';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const UserMealList = () => {
  const [selectedDay, setSelectedDay] = useState('MON');
  
  const [meals, setMeals] = useState([]);
  const [likedMeals, setLikedMeals] = useState({}); // State to track liked meals
  const navigation = useNavigation();

  // Fetch meals from Firestore for the selected day
  // Fetch meals from Firestore for the selected day
  const fetchMeals = async () => {
    try {
      const q = query(collection(db, 'meals'), where('day', '==', selectedDay)); // Query meals for the selected day
      const querySnapshot = await getDocs(q);
      const mealsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMeals(mealsData);

      // Set liked meals based on the fetched data
      const likedState = {};
      mealsData.forEach((meal) => {
        likedState[meal.id] = meal.likes > 0;
      });
      setLikedMeals(likedState);
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetching meals. Please try again.');
    }
  };

  useEffect(() => {
    fetchMeals(); // Fetch meals whenever the selected day changes
  }, [selectedDay]);

  // Handle Like Button
  const handleLike = async (mealId, currentLikes) => {
    try {
      const mealRef = doc(db, 'meals', mealId);
      const newLikesCount = likedMeals[mealId] ? (currentLikes || 0) - 1 : (currentLikes || 0) + 1;

      // Update the like count in Firestore
      await updateDoc(mealRef, { likes: newLikesCount });

      // Toggle like state locally
      setLikedMeals((prevLikedMeals) => ({
        ...prevLikedMeals,
        [mealId]: !prevLikedMeals[mealId], // Toggle the like state
      }));

      fetchMeals(); // Refresh the meal list
    } catch (error) {
      console.error('Error updating likes:', error);
      Alert.alert('Error updating likes. Please try again.');
    }
  };
  

  // Render each meal card
  const renderMealCard = ({ item }) => (
    
    <View style={styles.mealCard}>
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
      <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { meal: item })}>
        <Text style={styles.mealType}>{item.type}</Text>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealTime}>at {item.time}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.mealActions}>
        {/* Like Button */}
        <TouchableOpacity onPress={() => handleLike(item.id, item.likes)}>
          <AntDesign
            name={likedMeals[item.id] ? 'like1' : 'like2'}
            size={18}
            color={likedMeals[item.id] ? 'black' : 'black'} // Change color based on liked state
            style={styles.likeIconButton}
          />
        </TouchableOpacity>
      </View>
    </View>
   
  );

  return (
    <View style={styles.container}>
      {/* Day Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayTab, selectedDay === day && styles.selectedDayTab]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayTabText, selectedDay === day && styles.selectedDayTabText]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
          {/* Minimal spacing between day tabs and meal list */}
          <View style={styles.dayTabsSpacing} />
          <View style={styles.container12}>
          <Text style={styles.title}>Meals for {selectedDay}</Text>
          {/* Meal List for Selected Day */}
          <FlatList
            data={meals}
            renderItem={renderMealCard}
            keyExtractor={(item) => item.id}
            key={selectedDay} 
            contentContainerStyle={styles.mealList}
            numColumns={2}
            ListEmptyComponent={<Text style={styles.emptyMessage}>No meals added for {selectedDay} yet.</Text>}
          />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#e6f0fa',
      },
      container12: {
        paddingTop: 1,
        flex: 70,
        backgroundColor: '#e6f0fa',
      },
      dayTabs: {
        marginVertical: 5,
        paddingHorizontal: 5,
      },
      dayTabsSpacing: {
        marginTop: 1,
      },
      dayTab: {
        paddingHorizontal: 8, // Reduced padding to make tabs smaller horizontally
        paddingVertical: 3, // Reduced vertical padding to decrease height
        borderRadius: 12, // Adjusted border radius for a more compact look
        backgroundColor: '#ddd',
        marginHorizontal: 5, // Reduced margin between tabs
        height: 30,
      },
      selectedDayTab: {
        backgroundColor: '#0C5481',
      },
      dayTabText: {
        fontSize: 16,
        color: '#000',
      },
      selectedDayTabText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      title: {
        fontSize: 28,
        marginBottom: 10,
        color: '#0C5481',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      mealList: {
        paddingHorizontal: 10,
        paddingTop: 20,
      },
      mealCard: {
        backgroundColor: '#0C5481',
        borderRadius: 20,
        padding: 25,
        flex: 1,                     // Take up available space
        margin: 10,                   // Margin between cards
        maxWidth: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',  
        marginBottom: 30,
        marginTop:25,
        height:160,
      },
      mealImage: {
        width: 90,                    // Adjusted width for a better fit
        height: 90,                   // Adjusted height for a better fit
        borderRadius: 45,             // Circular image for meal card
        marginTop: -80,               // Create overlap effect by using a negative margin
        borderWidth: 3,
        borderColor: '#fff',
        
      },
      mealInfo: {
        alignItems: 'center',
      },
      mealType: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      mealName: {
        fontSize: 14,
        color: '#fff',
        fontFamily:'irish',
      },
      mealTime: {
        fontSize: 12,
        color: '#fff',
      },
      servings: {
        fontSize: 12,
        color: '#fff',
      },
      mealActions: {
        flexDirection: 'row',
        marginTop: 5,
      },
      likeIconButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        elevation: 5,
        zIndex: 1, 
        bottom: -25, 
        right: -70,
        position: 'absolute',
      },
      likeCount: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 5,
      },
      emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
        color: '#999',
        marginTop: 50,
      },
});

export default UserMealList;
