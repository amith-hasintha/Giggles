import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { db, storage } from '../../configs/FirebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const UpdateDailyUpdate = ({ route, navigation }) => {
  const { updateId, initialData } = route.params; // Get passed parameters
  const [updateText, setUpdateText] = useState(initialData.updateText);
  const [attachment, setAttachment] = useState(null); // Store new file path temporarily
  const [loading, setLoading] = useState(false);

  // Function to handle file picking
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      console.log("Document Picker Result:", result);

      if (result && !result.canceled) {
        const fileUri = result.assets[0]?.uri;

        if (fileUri) {
          setAttachment(fileUri); // Store the document URI
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

  // Function to upload the file to Firebase Storage (You can add this later)

  // Function to handle the update process
  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Update the Firestore document
      const updateRef = doc(db, 'dailyUpdates', updateId);
      await updateDoc(updateRef, {
        updateText,
        attachment: attachment, // Use either the new or existing attachment URL
      });

      Alert.alert('Success', 'Daily update updated successfully!');
      navigation.navigate('DisplayDailyUpdates'); // Navigate back after update
    } catch (error) {
      console.log('Error updating daily update', error);
      Alert.alert('Error', 'Could not update daily update');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the update details every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchUpdateData = async () => {
        try {
          const updateRef = doc(db, 'dailyUpdates', updateId);
          const updateSnap = await getDoc(updateRef);

          if (updateSnap.exists()) {
            const data = updateSnap.data();
            setUpdateText(data.updateText);
            setAttachment(data.attachment);
          }
        } catch (error) {
          console.log('Error fetching update data:', error);
        }
      };

      fetchUpdateData(); // Fetch the data when screen is focused
    }, [updateId]) // Depend on updateId
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Daily Update</Text>
      <TextInput
        style={styles.input}
        placeholder="Update Text"
        value={updateText}
        onChangeText={setUpdateText}
      />

      <TouchableOpacity style={styles.pickFileButton} onPress={pickDocument}>
        <Text style={styles.pickFileButtonText}>
          {attachment ? 'Change Attachment' : 'Pick an Attachment'}
        </Text>
      </TouchableOpacity>

      {/* Show the current file name */}
      <Text style={styles.attachmentText}>
        {attachment ? `Selected File: ${attachment.split('/').pop()}` : `Current Attachment: ${initialData.attachment?.split('/').pop() || 'None'}`}
      </Text>

      <Button title={loading ? 'Updating...' : 'Update'} onPress={handleUpdate} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickFileButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  pickFileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attachmentText: {
    marginBottom: 15,
    color: '#333',
  },
});

export default UpdateDailyUpdate;
