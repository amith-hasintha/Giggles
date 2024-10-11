import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const EditMeal = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mealId, mealData } = route.params ?? {};
  
  const [selectedMealType, setSelectedMealType] = useState('Lunch');
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [mealInfo, setMealInfo] = useState('');
  const [mealPhoto, setMealPhoto] = useState(null);

  useEffect(() => {
    if (!mealId || !mealData) {
      Alert.alert('Error', 'No meal data found to edit.');
      navigation.goBack();
    } else {
      setSelectedMealType(mealData.type || 'Lunch');
      setMealName(mealData.name || '');
      setMealTime(mealData.time || '');
      setMealInfo(mealData.ingredients || '');
      setMealPhoto(mealData.image || null);
    }
  }, [mealData, mealId]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMealPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!mealName || !mealTime || !mealInfo || !mealPhoto) {
      Alert.alert('Please fill in all the fields.');
      return;
    }

    const updatedMealDetails = {
      type: selectedMealType,
      name: mealName,
      time: mealTime,
      ingredients: mealInfo,
      image: mealPhoto,
    };

    try {
      const mealRef = doc(db, 'meals', mealId);
      await updateDoc(mealRef, updatedMealDetails);
      Alert.alert('Meal updated successfully!');
      navigation.navigate('MealList');
    } catch (error) {
      console.error('Error updating meal:', error);
      Alert.alert('Error updating meal. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Edit Meal</Text>
        <View style={styles.form}>
          {/* Meal Type Selection */}
          <Text style={styles.label}>Meal Type:</Text>
          <View style={styles.mealTypeContainer}>
            {mealTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.mealTypeButton,
                  selectedMealType === type && styles.selectedMealTypeButton,
                ]}
                onPress={() => setSelectedMealType(type)}
              >
                <Text
                  style={[
                    styles.mealTypeText,
                    selectedMealType === type && styles.selectedMealTypeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Meal Name Input */}
          <Text style={styles.label}>Meal Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Meal Name"
            value={mealName}
            onChangeText={setMealName}
          />

          {/* Time Input */}
          <Text style={styles.label}>Time:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Time"
            value={mealTime}
            onChangeText={setMealTime}
          />

          {/* Ingredients & Nutritional Info Input */}
          <Text style={styles.label}>Ingredients & Nutritional Info:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Ingredients & Nutritional Info"
            value={mealInfo}
            multiline={true}
            onChangeText={setMealInfo}
          />

          {/* Meal Photo Section */}
          <View style={styles.photoSection}>
            <Text style={styles.label}>Meal Photo:</Text>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Text style={styles.photoButtonText}>Change Photo</Text>
            </TouchableOpacity>
            {mealPhoto && (
              <Image source={{ uri: mealPhoto }} style={styles.photo} />
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('MealList')}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
      
    },
    container2: {
      margin: 15,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
      marginTop: 50,
    },
    header: {
      backgroundColor: '#4A90E2',
      padding: 15,
      align: 'center',
    },
    title: {
      fontSize: 28,
      color: '#0C5481',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    form: {
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginVertical: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    textArea: {
      height: 100,
    },
    mealTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    mealTypeButton: {
      padding: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#f0f8ff',
    },
    selectedMealTypeButton: {
      backgroundColor: '#ccc',
    },
    mealTypeText: {
      fontSize: 16,
      color: '#000',
    },
    selectedMealTypeText: {
      color: '#fff',
    },
    photoSection: {
      marginVertical: 20,
      alignItems: 'flex-start', // Aligns the photo section to the left
      marginLeft: 0, // Set marginLeft to 0 or adjust as needed
    },
    photoButton: {
      backgroundColor: '#E0E0E0',
      padding: 10,
      borderRadius: 5,
    },
    photoButtonText: {
      fontSize: 16,
      color: '#4A90E2',
    },
    photo: {
      width: 100,
      height: 100,
      marginTop: 10,
      borderRadius: 10,
      alignItems: 'flex-end',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    cancelButton: {
      backgroundColor: '#ccc',
      padding: 15,
      borderRadius: 30,
      width: 120,
      height: 50,
    },
    cancelButtonText: {
      fontSize: 16,
      color: '#000',
      textAlign: 'center',
    },
    saveButton: {
      backgroundColor: '#4A90E2',
      padding: 15,
      borderRadius: 30,
      width: 120,
      height: 50,
    },
    saveButtonText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
  });
  

export default EditMeal;