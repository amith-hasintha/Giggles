import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from './../configs/FirebaseConfig'; // Import Firestore config
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('parent'); // Default to parent
  const [studentId, setStudentId] = useState(''); // Only required if userType is parent
  const navigation = useNavigation();

  // Firestore Collection Reference
  const usersCollectionRef = collection(db, "users");

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    try {
      // Add the user to the Firestore users collection
      await addDoc(usersCollectionRef, {
        email,
        password,
        user_Type: userType,
        studentId: userType === 'parent' ? studentId : null // Only save studentId for parents
      });
      
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); // Navigate to login after signup
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* User Type Selection */}
      <Text style={styles.label}>User Type</Text>
      <View style={styles.userTypeContainer}>
        <TouchableOpacity 
          onPress={() => setUserType('parent')} 
          style={[styles.userTypeButton, userType === 'parent' && styles.activeButton]}>
          <Text style={styles.userTypeText}>Parent</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setUserType('teacher')} 
          style={[styles.userTypeButton, userType === 'teacher' && styles.activeButton]}>
          <Text style={styles.userTypeText}>Teacher</Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Student ID Input (only for parents) */}
      {userType === 'parent' && (
        <TextInput
          placeholder="Student ID"
          value={studentId}
          onChangeText={setStudentId}
          style={styles.input}
        />
      )}

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  userTypeButton: {
    flex: 1,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  userTypeText: {
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#0066cc',
    fontSize: 16,
  },
});

export default SignUp;
