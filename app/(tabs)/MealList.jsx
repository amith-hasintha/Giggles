import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Icon library for Add button
import { collection, query, where, getDocs, deleteDoc,doc, onSnapshot} from 'firebase/firestore'; // Firestore query imports
import { db } from '../configs/FirebaseConfig';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const MealList = () => {
  const [selectedDay, setSelectedDay] = useState('MON');
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  // Fetch meals from Firestore for the selected day (manual fetching)
  const fetchMeals = async () => {
    try {
      const q = query(collection(db, 'meals'), where('day', '==', selectedDay));
      const querySnapshot = await getDocs(q);

      const mealsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meals:', error);
      Alert.alert('Error fetching meals. Please try again.');
    }
  };

// Real-time listener to update meals for the selected day
useEffect(() => {
  // Call fetchMeals for initial load
  fetchMeals();

  // Set up the real-time listener with onSnapshot
  const q = query(collection(db, 'meals'), where('day', '==', selectedDay));
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const mealsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMeals(mealsData); // Update meals state in real-time
    },
    (error) => {
      console.error('Error fetching meals in real-time:', error);
      Alert.alert('Error fetching meals. Please try again.');
    }
  );

  // Cleanup the real-time listener on component unmount
  return () => unsubscribe();
}, [selectedDay]);

// Handle meal deletion
const deleteMeal = async (mealId) => {
  try {
    await deleteDoc(doc(db, 'meals', mealId)); // Delete meal document from Firestore
    Alert.alert('Meal deleted successfully!');
    fetchMeals(); // Refresh the meal list after deletion
  } catch (error) {
    console.error('Error deleting meal:', error);
    Alert.alert('Error deleting meal. Please try again.');
  }
};

// Show confirmation dialog
const showDeleteConfirmation = (mealId) => {
  Alert.alert(
    'Are you sure?',
    'You want to delete this Meal!',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteMeal(mealId), style: 'destructive' },
    ],
    { cancelable: true }
  );
};

  // Render each meal card
  const renderMealCard = ({ item }) => (
    <View style={styles.mealCard}>
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <View style={styles.mealActions}>
      <TouchableOpacity
       onPress={() => {
        console.log('Navigating to EditMeal with:', item); // Debug line
        navigation.navigate('EditMeal', { mealId: item.id, mealData: item }); // Pass both mealId and mealData
        }}
        >
      <Entypo name="edit" size={30} color="black" style={styles.editIconButton}/>
      </TouchableOpacity>
      </View>
      <View style={styles.mealInfo}>
        <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { meal: item })}>
          <Text style={styles.mealType}>{item.type}</Text>
          <Text style={styles.mealName}>{item.name}</Text>
          <Text style={styles.mealTime}>at {item.time}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mealActions}>
        {/* Show the number of likes in the admin meal card */}
        <TouchableOpacity disabled style={styles.likeContainer}>
        <AntDesign name="like1" size={18} color="black" style={styles.likeIconButton} />
          <Text style={styles.likeCount}>{item.likes || 0}</Text>
        </TouchableOpacity>
        <AntDesign name="delete" size={18} color="black" style={styles.deleteIconButton} onPress={() => showDeleteConfirmation(item.id)} />
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
      
{/* Add minimal spacing between day tabs and meal list */}
<View style={styles.dayTabsSpacing} />
<View style={styles.container12}>
<Text style={styles.title}>Meal List</Text>
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

{/* Add Button */}
<TouchableOpacity
  style={styles.addButton}
  onPress={() => navigation.navigate('AddMeal', { selectedDay })} // Pass the selected day
>

  <AntDesign name="plus" size={32} color="white" />
</TouchableOpacity>
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
    paddingTop: 170,
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
  likeIconButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,                // Adjust padding for button size
    position: 'absolute',       // Set absolute positioning
    bottom: -25,                 // Set distance from the bottom of the card
    right: -70,                  // Set distance from the right edge of the card
    elevation: 5,               // Add shadow effect for better visibility (optional)
    zIndex: 1,     
  },
  likeCount: {
    fontSize: 16,
    color: 'yellow',
    borderRadius: 100,
    fontWeight: 'bold',
    position: 'absolute',
    right: -78,
    bottom: -6,  
    zIndex: 1, 
    elevation: 9,  
  },
  deleteIconButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,                // Adjust padding for button size
    position: 'absolute',       // Set absolute positioning
    bottom: -25,                 // Set distance from the bottom of the card
    left: -70,                  // Set distance from the right edge of the card
    elevation: 5,               // Add shadow effect for better visibility (optional)
    zIndex: 1,     
  },
  editIconButton: {
    borderRadius: 20,
    padding: 5,                // Adjust padding for button size
    position: 'absolute',       // Set absolute positioning
    top: -69,                 // Set distance from the bottom of the card
    right: -70,                  // Set distance from the right edge of the card               // Add shadow effect for better visibility (optional)
    zIndex: 1,     
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1178B9',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default MealList;
