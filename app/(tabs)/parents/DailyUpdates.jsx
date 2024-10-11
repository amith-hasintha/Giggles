import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const DailyUpdates = ({ navigation }) => {
  const [updates, setUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentId, setStudentId] = useState(null); // State to hold the studentId

  // Retrieve student ID from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const id = await AsyncStorage.getItem('studentId'); // Retrieve student_id
        if (id !== null) {
          setStudentId(id);
          console.log("Retrieved student's ID from AsyncStorage:", id);
        }
      } catch (error) {
        console.error("Error retrieving student ID from AsyncStorage:", error);
      }
    };

    fetchStudentId(); // Fetch student_id on component mount
  }, []);

  // Fetch updates based on the student ID
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        // Create a query to fetch updates for the specific studentId
        const updatesCollection = collection(db, 'dailyUpdates'); // Replace with your Firestore collection name
        const updatesQuery = query(updatesCollection, where('userId', '==', studentId)); // Fetch updates for this studentId
        const snapshot = await getDocs(updatesQuery);
        const updatesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpdates(updatesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching daily updates:", error);
        setLoading(false);
      }
    };

    if (studentId) { // Only fetch updates if studentId is available
      fetchUpdates();
    }
  }, [studentId]);

  // Filter updates based on search query
  useEffect(() => {
    const filtered = updates.filter(update =>
      update.updateText.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUpdates(filtered);
  }, [updates, searchQuery]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Daily Updates</Text>

        {/* Display Student ID */}
        <Text style={styles.studentIdText}>Student ID: {studentId}</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Update Text"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {filteredUpdates.length === 0 ? (
          <Text style={styles.noUpdates}>No updates available.</Text>
        ) : (
          filteredUpdates.map(update => (
            <ImageBackground key={update.id} source={require('../../assets/parentbackground.png')} style={styles.updateContainer}>
              <Text style={styles.updateDate}>{update.date}</Text>
              <Text style={styles.updateText}>Update: {update.updateText}</Text>

              {update.attachment ? (
                <Image source={{ uri: update.attachment }} style={styles.attachmentImage} />
              ) : (
                <Text style={styles.noAttachmentText}>No attachment available</Text>
              )}
            </ImageBackground>
          ))
        )}
      </ScrollView>

      {/* Home Button centered at the bottom */}
      <View style={styles.homeButtonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('ParentHomePage')}>
          <Image source={require('../../assets/HomeIcon.png')} style={styles.homeIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUpdates: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  updateContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  updateDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateText: {
    fontSize: 16,
    marginTop: 5,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  attachmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  noAttachmentText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  studentIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  
  homeButton: {
    position: 'absolute', // Make the button fixed at the bottom
    bottom: 30,           // Adjust the distance from the bottom
    alignSelf: 'center',  // Center horizontally
  },
  homeIcon: {
    width: 60,  // Adjust the size of the home icon as needed
    height: 60,
  },
});

export default DailyUpdates;
