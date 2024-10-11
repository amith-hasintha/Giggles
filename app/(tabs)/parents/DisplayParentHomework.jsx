// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from "../../configs/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
// // Firebase configuration and initialization
// const firebaseConfig = {
//   apiKey: "AIzaSyDjHbtZNNuTIilya684ncVEvI04I16DgjU",
//   authDomain: "daycare-b8e35.firebaseapp.com",
//   projectId: "daycare-b8e35",
//   storageBucket: "daycare-b8e35.appspot.com",
//   messagingSenderId: "77829676340",
//   appId: "1:77829676340:web:cd5aece85a79dfc026d961",
//   measurementId: "G-M36FBW4NYK"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const DisplayParentHomework = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    // Fetch all activities from Firestore
    const fetchActivities = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "teacherActivities"));  // Change "activities" to your actual collection name
            const activitiesData = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                _id: doc.id // Add Firestore document ID to activity object
            }));
            console.log(activitiesData); // Log the fetched data
            setActivities(activitiesData);
        } catch (error) {
            console.log('Error fetching activities from Firestore', error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    // Refresh data when coming back from EditActivity
    const handleNavigationFocus = () => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchActivities(); // Re-fetch activities on focus
        });
        return unsubscribe;
    };

    useEffect(handleNavigationFocus, [navigation]);

    // Function to open the worksheet URL
    const openWorksheetURL = (url) => {
        Linking.openURL(url)
            .catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <ImageBackground
            source={require('../../assets/transparentpic.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.fixedHeader}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ParentHome')}>
                        <Text style={styles.backButton}>
                            <Feather name="arrow-left-circle" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ParentHomePage')}>
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.afterHeaderImage}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Home Works</Text>
                {activities.map(activity => (
                    <ImageBackground 
                        key={activity._id} 
                        source={require('../../assets/parentbackground.png')} 
                        style={styles.card}
                        imageStyle={{ borderRadius: 10 }} 
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{activity.title}</Text>
                            <TouchableOpacity 
                                style={styles.cardButton} 
                                onPress={() => navigation.navigate('WorkSheet', { activityId: activity._id })} // Navigate to the worksheet
                            >
                                <Text style={styles.buttonText}>Start</Text> 
                            </TouchableOpacity>
                            
                            {/* Display the worksheet URL if available */}
                            {activity.worksheet && activity.worksheet.url && (
                                <TouchableOpacity onPress={() => openWorksheetURL(activity.worksheet.url)}>
                                    <Text style={styles.dphlink}>Open Worksheet URL</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <Image 
                            source={require('../../assets/homecard.png')} 
                            style={styles.cardBottomImage} 
                        />
                    </ImageBackground>
                ))}
            </ScrollView>

            <Image 
                source={require('../../assets/pinkbird.png')} 
                style={styles.pinkBird}
            />
        </ImageBackground>
    );
}

export default DisplayParentHomework;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#96CBE9',
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
    backButton: {
        fontSize: 18,
        color: 'black',
    },
    afterHeaderImage: {
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
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#304F62',
    },
    cardButton: {
        backgroundColor: '#304F62',
        paddingVertical: 5,  
        paddingHorizontal: 10, 
        borderRadius: 35, 
        color: '#fff',
        textAlign: 'center',
        marginTop: 5, 
        height: 30,
        width: 100,
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
    },
    buttonText: {
        color: '#fff', 
        fontSize: 14, 
    },
    cardBottomImage: {
        width: 280,  
        height: 280, 
        position: 'absolute',
        right: -40,   
        resizeMode: 'contain', 
        bottom: -30,
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
    link: {
        marginTop: 10,
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
