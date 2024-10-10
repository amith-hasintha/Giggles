import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { initializeApp } from "firebase/app"; // Import Firebase app functions
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Firestore functions
import { db } from '../../configs/FirebaseConfig';

// Your web app's Firebase configuration
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

const TeacherHomeWork = ({ navigation }) => {
    const [homeworkItems, setHomeworkItems] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [worksheet, setWorksheet] = useState('');
    const [worksheetTitle, setWorksheetTitle] = useState(''); // New state for worksheet title
    const [loading, setLoading] = useState(false); // State for loading indicator

    useEffect(() => {
        fetchHomeworkItems();
    }, []);

    const fetchHomeworkItems = async () => {
        setLoading(true); // Start loading
        try {
            const querySnapshot = await getDocs(collection(db, "teacherActivities"));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHomeworkItems(items);
        } catch (err) {
            Alert.alert('Error', 'Failed to fetch homework items: ' + err.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleAddHomework = async () => {
        if (!title || !description || !worksheet || !worksheetTitle) {
            Alert.alert('Please fill all fields');
            return;
        }

        const newHomework = {
            title,
            description,
            worksheet,
            worksheetTitle,
            createdAt: new Date(), // Add createdAt timestamp
        };

        try {
            await addDoc(collection(db, "teacherActivities"), newHomework);
            fetchHomeworkItems(); // Refresh the list
            setTitle('');
            setDescription('');
            setWorksheet('');
            setWorksheetTitle(''); // Reset worksheet title
            Alert.alert('Success', 'Homework added successfully!');
            navigation.navigate('DisplayTeacherHomework'); // Navigate to another screen
        } catch (err) {
            console.error('Error adding homework:', err);
            Alert.alert('Error', 'Error adding homework');
        }
    };

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            console.log("Document Picker Result:", result);

            if (result && !result.canceled) {
                const fileUri = result.assets[0]?.uri;

                if (fileUri) {
                    setWorksheet(fileUri); // Store the document URI
                } else {
                    Alert.alert('Error', 'No URI found for the selected document.');
                }
            } else if (result?.canceled) {
                Alert.alert('Document selection was canceled.');
            } else {
                Alert.alert('Error', 'Unexpected result type: ' + JSON.stringify(result));
            }
        } catch (error) {
            console.error('Error picking document:', error);
            Alert.alert('Error', 'An error occurred while picking the document: ' + error.message);
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/teacherbackground.png')}
            style={styles.thwbackgroundImage}
        >
            <View style={styles.thwfixedHeader}>
            <View style={styles.thwheaderContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherHome')}>
                        <Text style={styles.thwbackButton}>
                            <Feather name="arrow-left-circle" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TeacherHomePage')}>
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.thwafterHeaderImage}
                />
            </View>

            <View style={styles.overlay}> 
                <ScrollView 
                    contentContainerStyle={styles.thwscrollContainer} 
                    showsVerticalScrollIndicator={false} 
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.thwtitle}>Add New Homework</Text>

                    <View style={styles.thwinputContainer}>
                        <Text style={styles.thwlabel}>Title</Text>
                        <TextInput
                            placeholder="Enter title"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.thwinput}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.thwinputContainer}>
                        <Text style={styles.thwlabel}>Description</Text>
                        <TextInput
                            placeholder="Enter description"
                            value={description}
                            onChangeText={setDescription}
                            style={[styles.thwinput, styles.thwdescriptionInput]}
                            multiline
                            numberOfLines={4}
                            placeholderTextColor="#999"
                        />
                    </View>
                    
                    <View style={styles.thwinputContainer}>
                        <Text style={styles.thwlabel}>Worksheet Title</Text>
                        <TextInput
                            placeholder="Enter worksheet title"
                            value={worksheetTitle}
                            onChangeText={setWorksheetTitle}
                            style={styles.thwinput}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.thwinputContainer}>
                        <Text style={styles.thwlabel}>Upload Worksheet</Text>
                        <View style={styles.thwworksheetInputContainer}>
                            <TextInput
                                placeholder="Upload Worksheet"
                                value={worksheet}
                                onChangeText={setWorksheet}
                                style={[styles.input, styles.thwworksheetInput]}
                                placeholderTextColor="#999"
                                editable={false} // Make it non-editable
                            />
                            <Feather name="upload" size={24} color="black" style={styles.thwuploadIcon} onPress={handlePickDocument} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleAddHomework} style={styles.thwaddButton}>
                        <Text style={styles.thwaddButtonText}>Add Homework</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    thwbackgroundImage: {
        flex: 1,
    },
    thwoverlay: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    thwscrollContainer: {
        paddingBottom: 20,
    },
    thwfixedHeader: {
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
    thwheaderContainer: {
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    thwafterHeaderImage: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    },
    thwtitle: {
        marginTop:200,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily:'Poppins-bold'
    },
    thwinputContainer: {
        marginBottom: 15,
    },
    thwlabel: {
        color: 'black',
        marginBottom: 5,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
    },
    thwinput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 15,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
    },
    thwworksheetInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    thwuploadIcon: {
        position: 'absolute',
        right: 30,
    },
    thwworksheetInput: {
        paddingRight: 40,
        flex: 1,
    },
    thwdescriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    thwaddButton: {
        backgroundColor: '#0C5481',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 95,
        marginTop: 20,
    },
    thwaddButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TeacherHomeWork;
