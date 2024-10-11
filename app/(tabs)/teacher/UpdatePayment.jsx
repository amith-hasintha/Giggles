import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { db } from '../../configs/FirebaseConfig'; // Assuming firebase is configured
import { doc, updateDoc } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';

const UpdatePayment = ({ route, navigation }) => {
    const { paymentId, initialData } = route.params; // Get payment ID and initial data from navigation params
    const [month, setMonth] = useState(initialData.month);
    const [studentId, setStudentId] = useState(initialData.studentId);
    const [monthlyFee, setMonthlyFee] = useState(initialData.monthlyFee);
    const [paidFee, setPaidFee] = useState(initialData.paidFee);
    const [remainingFee, setRemainingFee] = useState(initialData.remainingFee);
    const [loading, setLoading] = useState(false); // Loading state

    // Update remaining fee whenever monthly fee or paid fee changes
    useEffect(() => {
        const calculatedRemainingFee = Number(monthlyFee) - Number(paidFee);
        setRemainingFee(calculatedRemainingFee >= 0 ? calculatedRemainingFee : 0);
    }, [monthlyFee, paidFee]);

    // Function to update the payment
    const handleUpdatePayment = async () => {
        if (!month || !studentId || !monthlyFee || !paidFee) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true); // Set loading to true before updating

        try {
            const paymentRef = doc(db, 'payments', paymentId);
            await updateDoc(paymentRef, {
                month,
                studentId,
                monthlyFee,
                paidFee,
                remainingFee,
            });

            Alert.alert('Success', 'Payment updated successfully!');
            navigation.navigate('DisplayPayments');
        } catch (error) {
            console.log('Error updating payment', error);
            Alert.alert('Error', 'Could not update payment');
        } finally {
            setLoading(false); // Set loading to false after updating
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/teacherbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>
                        <Feather name="arrow-left-circle" size={24} color="black" />
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Update Payment</Text>
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Month"
                    value={month}
                    onChangeText={setMonth}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student ID"
                    value={studentId}
                    onChangeText={setStudentId}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Monthly Fee"
                    value={monthlyFee}
                    onChangeText={setMonthlyFee}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Paid Fee"
                    value={paidFee}
                    onChangeText={setPaidFee}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Remaining Fee"
                    value={remainingFee.toString()} // Ensure this is a string
                    editable={false} // Make this field read-only
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#304F62" style={styles.loadingIndicator} />
                ) : (
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePayment}>
                        <Text style={styles.updateButtonText}>Update Payment</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    updateButton: {
        backgroundColor: '#304F62',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default UpdatePayment;
