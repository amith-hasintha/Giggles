import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../configs/FirebaseConfig';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

const WorkSheet = () => {
    const [activity, setActivity] = useState(null);
    const [worksheet, setWorksheet] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { activityId } = route.params;

    useEffect(() => {
        const fetchActivity = async () => {
            if (activityId) {
                try {
                    // Fetch the activity from Firestore
                    const activityRef = doc(db, "teacherActivities", activityId); // Update with your Firestore collection name
                    const activitySnap = await getDoc(activityRef);

                    if (activitySnap.exists()) {
                        const activityData = activitySnap.data();
                        setActivity(activityData);
                        
                        const worksheetId = activityData.worksheet;

                        if (worksheetId) {
                            // Fetch the worksheet from Firestore
                            const worksheetRef = doc(db, "worksheets", worksheetId); // Update with your Firestore collection name
                            const worksheetSnap = await getDoc(worksheetRef);

                            if (worksheetSnap.exists()) {
                                setWorksheet(worksheetSnap.data());
                            }
                        }
                    } else {
                        console.log("No such activity!");
                    }
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
        };

        fetchActivity();
    }, [activityId]);

    return (
        <ImageBackground
            source={require('../../assets/transparentpic.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.fixedHeader}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.backButton}>
                                <Feather name="arrow-left-circle" size={24} color="black" />
                            </Text>
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

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <Text style={styles.homeworkTitle}>Homework</Text>

                        <Image
                            source={require('../../assets/homeworkpic.png')}
                            style={styles.homeworkImage}
                        />
                    </View>
                    <Image
                        source={require('../../assets/pinkbird.png')}
                        style={styles.birdImage}
                    />
                    <View style={styles.options}>
                        {activity ? (
                            <>
                                <View style={styles.optionContainer}>
                                    <Text style={styles.optionText}>Title: {activity.title}</Text>
                                </View>
                                <View style={styles.optionContainer}>
                                    <Text style={styles.optionText}>Description:</Text>
                                    <Text style={styles.descriptionText}>{activity.description}</Text>
                                </View>
                            </>
                        ) : (
                            <Text style={styles.loadingText}>Loading...</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => navigation.navigate('Ratings')} // Navigate to Submission.js
                    >
                        <Text style={styles.submitText}>Thank you...</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>

        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#96CBE9'
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
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 28,
        color: '#ffde5c',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    homeworkTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#000',
        marginTop:30,
        fontFamily:'Unkempt'
    },
    homeworkImage: {
        marginTop:-30,
        width: 350,  
        height: 350, 
        resizeMode: 'contain', 
        marginVertical: 10, 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    options: {
        marginTop:-40,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingVertical: 15,
        borderRadius: 20,
        marginBottom: 20,
        marginHorizontal: 20, 
    },
    optionContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginLeft:20,
        marginRight:20,
        borderRadius: 15,
    },
    optionText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'left', 
    },
    descriptionText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center', 
    },
    loadingText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    optionText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20, 
        alignSelf: 'center',
        width:200
    },
    submitText: {
        fontSize: 18,
        color: '#fff',
    },
    loadingText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    birdImage: {
        width: 110,
        height: 110,
        alignSelf: 'flex-end',
        marginTop: -79,
    },
});

export default WorkSheet;
