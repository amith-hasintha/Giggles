// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import React, { useEffect, useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Text, Modal, TouchableOpacity, Image, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from "../../configs/FirebaseConfig";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDjHbtZNNuTIilya684ncVEvI04I16DgjU",
//   authDomain: "daycare-b8e35.firebaseapp.com",
//   projectId: "daycare-b8e35",
//   storageBucket: "daycare-b8e35.appspot.com",
//   messagingSenderId: "77829676340",
//   appId: "1:77829676340:web:cd5aece85a79dfc026d961",
//   measurementId: "G-M36FBW4NYK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const EditActivity = ({ route, navigation }) => {
    const { activityId } = route.params; // Get the activity ID passed from the previous screen
    const [activity, setActivity] = useState({
        title: '',
        description: '',
        // worksheetTitle: '', // New state for worksheet title
        // worksheet: '' // State for worksheet URL
    });
    const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

    // Fetch the activity details
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const docRef = doc(db, "teacherActivities", activityId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setActivity({
                        title: data.title || '',
                        description: data.description || '',
                        // worksheetTitle: data.worksheetTitle || '', // Ensure worksheet title is fetched properly
                        // worksheet: data.worksheet || ''  // Ensure worksheet URL is fetched properly
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching activity:", error);
            }
        };

        fetchActivity();
    }, [activityId]);

    // Update activity details
    const handleUpdate = async () => {
        try {
            const docRef = doc(db, "teacherActivities", activityId);
            await updateDoc(docRef, activity);
            setModalVisible(true); // Show the modal on successful update
            setTimeout(() => {
                setModalVisible(false); // Hide the modal after 2 seconds
                navigation.navigate('DisplayTeacherHomework', { refresh: true }); // Navigate back with a refresh signal
            }, 2000);
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/teacherbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.fixedHeader}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('DisplayTeacherHomework')}>
                        <Text style={styles.backButton}>
                            <Feather name="arrow-left-circle" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.afterHeaderImage}
                />
            </View>

            <KeyboardAvoidingView style={styles.flexContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    showsVerticalScrollIndicator={false} // Hides the vertical scroll indicator
                    keyboardShouldPersistTaps="handled" // Ensures taps on buttons work even with the keyboard open
                >
                    <View style={styles.container}>
                        <Text style={styles.header}>Edit Activity</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={activity.title}
                            onChangeText={text => setActivity({ ...activity, title: text })}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={activity.description}
                            onChangeText={text => setActivity({ ...activity, description: text })}
                            placeholderTextColor="#888"
                        />
                        {/* <TextInput
                            style={styles.input}
                            placeholder="Worksheet Title" // New input for worksheet title
                            value={activity.worksheetTitle} 
                            onChangeText={text => setActivity({ ...activity, worksheetTitle: text })}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Worksheet URL"
                            value={activity.worksheet} // Ensure the worksheet URL is correctly displayed
                            onChangeText={text => setActivity({ ...activity, worksheet: text })}
                            placeholderTextColor="#888"
                        /> */}
                        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update Activity</Text>
                        </TouchableOpacity>

                        {/* Modal for success message */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalMessage}>Activity updated successfully!</Text>
                                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Add the greenbird image at the bottom right corner */}
            <Image
                source={require('../../assets/greenbird.png')}
                style={styles.greenbird}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: 'black', 
        fontFamily:'Poppins-bold'
    },
    input: {
        height: 50,
        borderColor: '#304F62', 
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 45,
        padding: 10,
        backgroundColor: '#fff', 
        fontSize: 16,
    },
    updateButton: {
        backgroundColor: '#0C5481',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 15,
        marginLeft: 75,
        marginRight: 75
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalMessage: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#0C5481',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    greenbird: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
});

export default EditActivity;
