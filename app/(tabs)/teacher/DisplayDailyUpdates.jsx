import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert, TextInput, ActivityIndicator } from 'react-native';
import { db } from '../../configs/FirebaseConfig'; // Assuming firebase is configured
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const DisplayDailyUpdates = ({ navigation }) => {
  const [updates, setUpdates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all daily updates
  const fetchUpdates = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const updatesCollection = collection(db, 'dailyUpdates'); // Replace with your daily updates collection name
      const updatesSnapshot = await getDocs(updatesCollection);
      const updatesList = updatesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUpdates(updatesList);
    } catch (error) {
      console.log('Error fetching daily updates', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Use useFocusEffect to fetch updates every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUpdates();
    }, [])
  );

  // Function to handle deletion of a daily update
  const handleDeleteUpdate = async (updateId) => {
    Alert.alert(
      'Delete Daily Update',
      'Are you sure you want to delete this update?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'dailyUpdates', updateId)); // Replace with your daily updates collection name
              fetchUpdates(); // Refresh the list
              Alert.alert('Success', 'Daily update deleted successfully!');
            } catch (error) {
              console.log('Error deleting daily update', error);
              Alert.alert('Error', 'Could not delete daily update');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Filtered updates based on search query
  const filteredUpdates = updates.filter(update =>
    update.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={require('../../assets/teacherbackground.png')}
      style={styles.dthbackground}
      resizeMode="cover"
    >
      <View style={styles.dthfixedHeader}>
        <View style={styles.dthheaderContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
            <Text style={styles.dthbackButton}>
              <Feather name="arrow-left-circle" size={24} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image source={require('../../assets/logo.png')} style={styles.dthafterHeaderImage} />
      </View>

      <ScrollView contentContainerStyle={styles.dthscrollContainer}>
        <Text style={styles.dthtitle}>Daily Updates</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by User ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#304F62" style={styles.loadingIndicator} />
        ) : (
          filteredUpdates.map(update => (
            <ImageBackground
              key={update.id}
              source={require('../../assets/parentbackground.png')}
              style={styles.dthcard}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.dthcardContent}>
                <Text style={styles.dthcardTitle}>Date: {update.date}</Text>
                <Text style={styles.dthcardTitle}>Student ID: {update.userId}</Text>
                <Text style={styles.dthcardDescription}>Update: {update.updateText}</Text>

                {update.attachment ? (
                  // Display the image attachment if it exists
                  <Image
                    source={{ uri: update.attachment }} // Display image using the attachment URL
                    style={styles.dthattachmentImage}
                  />
                ) : (
                  <Text style={styles.dthnoAttachmentText}>No attachment available</Text>
                )}
              </View>
              {/* <Image source={require('../../assets/homecard.png')} style={styles.dthcardBottomImage} /> */}
              
                <TouchableOpacity
                  style={styles.dthiconButton}
                  onPress={() => handleDeleteUpdate(update.id)}
                >
                  <Ionicons name="remove-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('UpdateDailyUpdate', { updateId: update.id, initialData: update })}
                >
                  <Ionicons name="create" size={24} color="black" />
                </TouchableOpacity>
              
            </ImageBackground>
          ))
        )}
      </ScrollView>
      <View style={styles.v1}>
      <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('DailyUpdateForm')}
            >
                <Text style={styles.addButtonText}>Add New Update</Text>
        </TouchableOpacity>
        
        </View>
      
      <Image source={require('../../assets/pinkbird.png')} style={styles.dthpinkBird} />
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  dthbackground: {
    flex: 1,
  },
  dthfixedHeader: {
    position: 'absolute',
    top: 5,
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
  dthheaderContainer: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dthbackButton: {
    fontSize: 18,
    color: 'black',
  },
  editButton: {
    padding: 10
  },
  dthafterHeaderImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  dthscrollContainer: {
    paddingTop: 170,
    paddingBottom: 40,
  },
  dthtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    fontStyle: 'Poppins-bold'
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  dthcard: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
    position: 'relative',
  },
  dthcardContent: {
    flex: 1,
    paddingBottom:10
  },
  dthcardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#304F62',
  },
  dthcardDescription: {
    fontSize: 16,
    color: '#666',
  },
  dthattachmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'contain',
  },
  dthnoAttachmentText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  dthiconButton: {
    
     marginLeft: 10,
    // marginBottom: 5,
    // marginTop: -30,
  },
  dthcardBottomImage: {
    width: 180,
    height: 180,
    position: 'absolute',
    right: 60,
    resizeMode: 'contain',
    bottom: -30,
  },
  dthpinkBird: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    opacity: 0.6,
  },
  addButton: {
    backgroundColor: '#304F62',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width:'90%'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  v1:{
    alignItems:'center',
  }

});

export default DisplayDailyUpdates;