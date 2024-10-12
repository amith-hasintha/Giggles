import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Icon library for Like button
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Firestore imports
import { db } from '../configs/FirebaseConfig';
import Feather from '@expo/vector-icons/Feather';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const UserMealList = () => {
  const [selectedDay, setSelectedDay] = useState('MON');
  const [meals, setMeals] = useState([]);
  const [likedMeals, setLikedMeals] = useState({});
  const navigation = useNavigation();

  // Fetch meals from Firestore for the selected day
  const fetchMeals = async () => {
    try {
      const q = query(collection(db, 'meals'), where('day', '==', selectedDay));
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

      // Immediately update the local state
      setLikedMeals((prevLikedMeals) => ({
        ...prevLikedMeals,
        [mealId]: !prevLikedMeals[mealId], // Toggle the like state
      }));

      // Update the meal's local like count
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal.id === mealId ? { ...meal, likes: newLikesCount } : meal
        )
      );
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
        <TouchableOpacity onPress={() => navigation.navigate('UserMealDetails', { meal: item })}>
          <Text style={styles.mealType}>{item.type}</Text>
          <Text style={styles.mealName}>{item.name}</Text>
          <Text style={styles.mealTime}>at {item.time}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mealActions}>
        {/* Like Button */}
        <TouchableOpacity onPress={() => handleLike(item.id, item.likes)} style={styles.likeContainer}>
          <AntDesign
            name={likedMeals[item.id] ? 'like1' : 'like2'}
            size={18}
            color={likedMeals[item.id] ? 'black' : 'black'}
            style={styles.likeIconButton}
          />
        </TouchableOpacity>
      </View>
    </View>
    
  );

  return (
    <ImageBackground
      source={require('./../assets/teacherbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
            <Feather name="arrow-left-circle" size={28} color="#304F62" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('./../assets/logo.png')}
          style={styles.afterHeaderImage}
        />
      </View>
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
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  container12: {
    paddingTop: 1,
    flex: 70,
  
  },
  dayTabs: {
    paddingTop: 135,
    paddingHorizontal: 5,
  },
  dayTabsSpacing: {
    marginTop: 1,
  },
  dayTab: {
    paddingHorizontal: 7, // Reduced padding to make tabs smaller horizontally
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
    color: '#0C5481',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mealList: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  mealCard: {
    backgroundColor: '#0B4A71',
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
    fontFamily:'irish',
    color: '#fff',
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
  likeContainer: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 5,
    elevation: 5,
    zIndex: 1, 
    bottom: -25, 
    right: -70,
    position: 'absolute',
  },
 
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
 
});

export default UserMealList;
