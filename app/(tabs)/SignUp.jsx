import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Import required Firestore functions
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

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check if email already exists
  const isEmailInUse = async (email) => {
    const q = query(usersCollectionRef, where("email", "==", email)); // Query to check if email exists
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // If querySnapshot is not empty, email exists
  };

  // Handle SignUp
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    // Student ID validation for parents
    if (userType === 'parent' && !studentId) {
      Alert.alert("Error", "Please enter a valid Student ID.");
      return;
    }

    // Check if email is already in use
    const emailInUse = await isEmailInUse(email);
    if (emailInUse) {
      Alert.alert("Error", "This email is already in use. Please try logging in.");
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
    <ImageBackground
      source={require('./../assets/background.png')} // Ensure you have the correct path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <Image 
          source={require('./../assets/logo.png')} // Ensure you have the correct path to your logo
          style={styles.logo}
          resizeMode="contain"
        />

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
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        
        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Student ID Input (only for parents) */}
        {userType === 'parent' && (
          <TextInput
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.input}
            placeholderTextColor="#999"
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  logo: {
    width: '100%',   // Adjust the width and height of your logo as needed
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color:'#000',
    marginBottom: 10,
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
    width: "100%",
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: "100%",
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
