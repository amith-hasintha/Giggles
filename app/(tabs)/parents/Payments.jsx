import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentId, setStudentId] = useState(null); // State to hold the studentId

  const navigation = useNavigation(); // Navigation hook

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

  // Fetch payments based on the student ID
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        // Create a query to fetch payments for the specific studentId
        const paymentsCollection = collection(db, 'payments'); // Replace with your Firestore collection name
        const paymentsQuery = query(paymentsCollection, where('studentId', '==', studentId)); // Fetch payments for this studentId
        const snapshot = await getDocs(paymentsQuery);
        const paymentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPayments(paymentsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    };

    if (studentId) { // Only fetch payments if studentId is available
      fetchPayments();
    }
  }, [studentId]);

  // Filter payments based on search query
  useEffect(() => {
    const filtered = payments.filter(payment =>
      payment.month.toLowerCase().includes(searchQuery.toLowerCase()) || 
      payment.paidFee.toString().includes(searchQuery) ||
      payment.remainingFee.toString().includes(searchQuery)
    );
    setFilteredPayments(filtered);
  }, [payments, searchQuery]);

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
        <Text style={styles.title}>Payments</Text>

        {/* Display Student ID */}
        <Text style={styles.studentIdText}>Student ID: {studentId}</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Month or Fee"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {filteredPayments.length === 0 ? (
          <Text style={styles.noPayments}>No payments available.</Text>
        ) : (
          filteredPayments.map(payment => (
            <ImageBackground key={payment.id} source={require('../../assets/parentbackground.png')} style={styles.paymentContainer}>
              <Text style={styles.paymentMonth}>Month: {payment.month}</Text>
              <Text style={styles.paymentDetails}>Monthly Fee: {payment.monthlyFee}</Text>
              <Text style={styles.paymentDetails}>Paid Fee: {payment.paidFee}</Text>
              <Text style={styles.paymentDetails}>Remaining Fee: {payment.remainingFee}</Text>
            </ImageBackground>
          ))
        )}
      </ScrollView>

      {/* Home Button fixed at the bottom */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('ParentHomePage')}>
        <Image source={require('../../assets/HomeIcon.png')} style={styles.homeIcon} />
      </TouchableOpacity>
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
  noPayments: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  paymentContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  paymentMonth: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentDetails: {
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
  studentIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Adjust color as needed
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

export default Payments;
