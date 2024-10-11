import React, { useState } from 'react';
import {Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker
import { db } from '../../configs/FirebaseConfig'; // Assuming firebase is configured in firebaseConfig
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

const AddPaymentForm = ({ navigation }) => {
  const [month, setMonth] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');
  const [paidFee, setPaidFee] = useState('');
  const [remainingFee, setRemainingFee] = useState(0);
  const [date] = useState(new Date().toISOString().slice(0, 10)); // Set current date
  const [studentId, setStudentId] = useState(''); // State for Student ID

  // Update remaining fee based on monthly fee and paid fee
  const handleFeeChange = (value, setter) => {
    setter(value);
    const monthly = parseFloat(monthlyFee) || 0;
    const paid = parseFloat(value) || 0;
    setRemainingFee(monthly - paid);
  };

  // Handle saving the payment data
  const handleSavePayment = async () => {
    if (!month || !monthlyFee || !paidFee || !studentId) { // Check for student ID
      Alert.alert('Please fill all fields');
      return;
    }

    const newPayment = {
      month,
      monthlyFee: parseFloat(monthlyFee),
      paidFee: parseFloat(paidFee),
      remainingFee,
      date,
      studentId, // Include Student ID in the payment data
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "payments"), newPayment); // Save to "payments" collection
      Alert.alert('Payment Saved', 'Payment added successfully!');
      // Reset the form after saving
      setMonth('');
      setMonthlyFee('');
      setPaidFee('');
      setRemainingFee(0);
      setStudentId(''); // Reset Student ID
      navigation.navigate('DisplayPayments'); // Navigate to your payments display screen
    } catch (err) {
      console.error('Error adding payment:', err);
      Alert.alert('Error', 'Error saving payment data');
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
          <Text style={styles.title}>Add Payment</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Student ID</Text>
            <TextInput
              placeholder="Enter Student ID"
              value={studentId}
              onChangeText={setStudentId}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Month</Text>
            <Picker
              selectedValue={month}
              onValueChange={(itemValue) => setMonth(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Month" value="" />
              <Picker.Item label="January" value="January" />
              <Picker.Item label="February" value="February" />
              <Picker.Item label="March" value="March" />
              <Picker.Item label="April" value="April" />
              <Picker.Item label="May" value="May" />
              <Picker.Item label="June" value="June" />
              <Picker.Item label="July" value="July" />
              <Picker.Item label="August" value="August" />
              <Picker.Item label="September" value="September" />
              <Picker.Item label="October" value="October" />
              <Picker.Item label="November" value="November" />
              <Picker.Item label="December" value="December" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monthly Fee</Text>
            <TextInput
              placeholder="Enter Monthly Fee"
              value={monthlyFee}
              onChangeText={(value) => {
                setMonthlyFee(value);
                setRemainingFee((parseFloat(value) || 0) - (parseFloat(paidFee) || 0));
              }}
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Paid Fee</Text>
            <TextInput
              placeholder="Enter Paid Fee"
              value={paidFee}
              onChangeText={(value) => handleFeeChange(value, setPaidFee)}
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Remaining Fee</Text>
            <TextInput
              placeholder="Remaining Fee"
              value={remainingFee.toString()} // Convert remaining fee to string for display
              style={[styles.input, styles.worksheetInput]}
              editable={false} // Set to false to prevent manual entry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity onPress={handleSavePayment} style={styles.addButton}>
            <Text style={styles.addButtonText}>Save Payment</Text>
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
    marginTop: 60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0C5481',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    padding: 10,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0C5481',
    borderRadius: 8,
    padding: 15,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // Android shadow
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#0C5481',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  addButton: {
    backgroundColor: '#0C5481',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3, // Android shadow
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
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

export default AddPaymentForm;
