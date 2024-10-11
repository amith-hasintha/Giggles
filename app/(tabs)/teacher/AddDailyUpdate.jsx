import React, { useState, useEffect } from 'react';
import {Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { initializeApp } from "firebase/app"; // Import Firebase app functions
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Firestore functions
import * as DocumentPicker from 'expo-document-picker';
import { db } from '../../configs/FirebaseConfig'; // Assuming firebase is configured in firebaseConfig

const DailyUpdateForm = ({ navigation }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Set initial date to current date
  const [userId, setUserId] = useState(''); // Added userId field
  const [updateText, setUpdateText] = useState('');
  const [attachment, setAttachment] = useState({}); // Object to store uri and name
  const [loading, setLoading] = useState(false); // State for loading indicator

  

  // Handle file picking
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      console.log("Document Picker Result:", result);

      if (result && !result.canceled) {
        const fileUri = result.assets[0]?.uri; // Get the URI of the selected document
        const fileName = result.name; // Get the name of the selected document

        if (fileUri) {
          setAttachment(fileUri); // Store the document URI and name
        } else {
          Alert.alert('Error', 'No URI found for the selected document.');
        }
      } else if (result?.canceled) {
        Alert.alert('Document selection was canceled.');
      } else {
        Alert.alert('Error', 'Unexpected result type: ' + JSON.stringify(result));
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'An error occurred while picking the document: ' + error.message);
    }
  };

  // Handle saving the daily update
  const handleSaveUpdate = async () => {
    if (!date || !updateText || !attachment || !userId) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newUpdate = {
      date,
      userId,
      updateText,
      attachment: attachment, // Save the file name
      createdAt: new Date(), // Add createdAt timestamp
    };

    try {
      await addDoc(collection(db, "dailyUpdates"), newUpdate);
      Alert.alert('Update Saved', 'Daily update added successfully!');
      // Reset the form after saving
      setDate(new Date().toISOString().slice(0, 10)); // Set date to current date again
      setUserId(''); // Reset userId
      setUpdateText('');
      setAttachment({});
      navigation.navigate('DisplayDailyUpdates'); // Navigate to another screen
    } catch (err) {
      console.error('Error adding update:', err);
      Alert.alert('Error', 'Error saving daily update');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/teacherbackground.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add Daily Update</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>User ID</Text>
            <TextInput
              placeholder="Enter User ID"
              value={userId}
              onChangeText={setUserId}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              placeholder="DD/MM/YYYY"
              value={date}
              onChangeText={setDate}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Updates</Text>
            <TextInput
              placeholder="Add your comments for this child here.."
              value={updateText}
              onChangeText={setUpdateText}
              style={[styles.input, styles.descriptionInput]}
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Upload Attachments</Text>
            <View style={styles.worksheetInputContainer}>
              <TextInput
                placeholder="Upload Attachments"
                value={attachment}
                onChangeText={setAttachment}
                style={[styles.input, styles.worksheetInput]}
                placeholderTextColor="#999"
                editable={false} 
              />
              <Feather name="upload" size={24} color="black" style={styles.uploadIcon} onPress={handlePickDocument} />
            </View>
          </View>

          <TouchableOpacity onPress={handleSaveUpdate} style={styles.addButton}>
            <Text style={styles.addButtonText}>Save Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('TeacherHomePage')}>
          <Image source={require('../../assets/HomeIcon.png')} style={styles.homeIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    marginTop:60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 10,
    justifyContent:'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    padding:10,
    // marginBottom: 15,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
  worksheetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadIcon: {
    position: 'absolute',
    right: 30,
  },
  worksheetInput: {
    paddingRight: 40,
    flex: 1,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#0C5481',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
    
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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

export default DailyUpdateForm;