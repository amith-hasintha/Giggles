import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const ParentHomePage = ({ navigation }) => {
    const [studentId, setStudentId] = useState(null); // State to hold the studentId

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

    return (
        <ImageBackground
            source={require('../../assets/parenthomepg.png')} // Change this to your background image
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.fixedHeader}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left-circle" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Menu pressed')}>
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.afterHeaderImage}
                />
            </View>

            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome Parent!</Text>
                {studentId && (
                    <Text style={styles.studentIdText}>Student ID: {studentId}</Text>
                )}
            </View>

            <View style={styles.overlay}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.gridContainer}>
                        {[
                            { title: 'Daily Updates', image: require('../../assets/updates.png'), screen: 'DailyUpdates' },
<<<<<<< HEAD
                            { title: 'Activities', image: require('../../assets/activity.png'), screen: 'Activities' },
=======
                            { title: 'Activities', image: require('../../assets/activity.png'), screen: 'ParentHome' },
>>>>>>> f2a8bd68f885296a6841034b9f471e84012909de
                            { title: 'Meal Tracking', image: require('../../assets/meal.png'), screen: 'UserMealList' },
                            { title: 'Payment Details', image: require('../../assets/payment.png'), screen: 'Payments' },
                        ].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.button}
                                onPress={() => {
                                    if (item.screen === 'DailyUpdates') {
                                        navigation.navigate(item.screen, { studentId }); // Pass studentId here
                                    } else if(item.screen === 'Payments') {
                                        navigation.navigate(item.screen, { studentId })}
                                        else{
                                        navigation.navigate(item.screen);
                                    }
                                }}
                            >
                                <Image source={item.image} style={styles.icon} />
                                <Text style={styles.buttonText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.footerText}>© 2024 Giggles. All rights reserved.</Text>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.9,
    },
    fixedHeader: {
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
    afterHeaderImage: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    },
    welcomeContainer: {
        marginTop: 180,
        alignItems: 'center',
        paddingBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    gridContainer: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 60,
    },
    button: {
        width: '40%',
        margin: 10,
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
    },
    buttonText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    studentIdText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', // Change this color to match your design
    },
});

export default ParentHomePage;
