import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert, TextInput, ActivityIndicator } from 'react-native';
import { db } from '../../configs/FirebaseConfig'; // Assuming firebase is configured
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const DisplayPayments = ({ navigation }) => {
    const [payments, setPayments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch all payments
    const fetchPayments = async () => {
        try {
            setLoading(true); // Set loading to true before fetching
            const paymentsCollection = collection(db, 'payments'); // Your payments collection
            const paymentsSnapshot = await getDocs(paymentsCollection);
            const paymentsList = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPayments(paymentsList);
            console.log('Fetched Payments:', paymentsList); // Log fetched payments for debugging
        } catch (error) {
            console.log('Error fetching payments', error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Use useFocusEffect to fetch payments every time the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchPayments();
        }, [])
    );

    // Function to handle deletion of a payment
    const handleDeletePayment = async (paymentId) => {
        Alert.alert(
            'Delete Payment',
            'Are you sure you want to delete this payment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'payments', paymentId)); // Your payments collection
                            fetchPayments(); // Refresh the list
                            Alert.alert('Success', 'Payment deleted successfully!');
                        } catch (error) {
                            console.log('Error deleting payment', error);
                            Alert.alert('Error', 'Could not delete payment');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // Filtered payments based on search query
    const filteredPayments = payments.filter(payment => 
        payment.studentId && payment.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ImageBackground
            source={require('../../assets/teacherbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('TeacherHome')}>
                        <Text style={styles.backButton}>
                            <Feather name="arrow-left-circle" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image source={require('../../assets/logo.png')} style={styles.headerImage} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Payments</Text>

                {/* Search Bar */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by Student ID"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* Loading Indicator */}
                {loading ? (
                    <ActivityIndicator size="large" color="#304F62" style={styles.loadingIndicator} />
                ) : (
                    filteredPayments.length > 0 ? (
                        filteredPayments.map(payment => (
                            <ImageBackground
                                key={payment.id}
                                source={require('../../assets/parentbackground.png')}
                                style={styles.card}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>Month: {payment.month}</Text>
                                    <Text style={styles.cardTitle}>Student ID: {payment.studentId}</Text>
                                    <Text style={styles.cardDescription}>Monthly Fee: {payment.monthlyFee}</Text>
                                    <Text style={styles.cardDescription}>Paid Fee: {payment.paidFee}</Text>
                                    <Text style={styles.cardDescription}>Remaining Fee: {payment.remainingFee}</Text>
                                </View>
                                <View style={styles.icons}>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => handleDeletePayment(payment.id)}
                                    >
                                        <Ionicons name="remove-circle" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => navigation.navigate('UpdatePayment', { paymentId: payment.id, initialData: payment })}
                                    >
                                        <Ionicons name="create" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        ))
                    ) : (
                        <Text style={styles.noPaymentsText}>No payments found</Text>
                    )
                )}
            </ScrollView>

            {/* Add New Payment Button */}
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('AddPaymentForm')}
            >
                <Text style={styles.addButtonText}>Add New Payment</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/pinkbird.png')} style={styles.pinkBird} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
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
    headerContainer: {
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        fontSize: 18,
        color: 'black',
    },
    editButton: {
        padding: 10,
    },
    headerImage: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    },
    scrollContainer: {
        paddingTop: 170,
        paddingBottom: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        fontStyle: 'Poppins-bold',
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
    card: {
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
    cardContent: {
        flex: 1,
        paddingBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#304F62',
    },
    cardDescription: {
        fontSize: 16,
        color: '#666',
    },
    attachmentImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        resizeMode: 'contain',
    },
    noAttachmentText: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    iconButton: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: -30,
    },
    pinkBird: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        opacity: 0.6,
    },
    noPaymentsText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#666',
    },
    addButton: {
        backgroundColor: '#304F62',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DisplayPayments;
