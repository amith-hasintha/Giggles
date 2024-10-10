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
            style={styles.backgroundImage}
        >
            <View style={styles.fixedHeader}>
            <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
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

            <View style={styles.overlay}> 
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    showsVerticalScrollIndicator={false} 
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>Add New Homework</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            placeholder="Enter title"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            placeholder="Enter description"
                            value={description}
                            onChangeText={setDescription}
                            style={[styles.input, styles.descriptionInput]}
                            multiline
                            numberOfLines={4}
                            placeholderTextColor="#999"
                        />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Worksheet Title</Text>
                        <TextInput
                            placeholder="Enter worksheet title"
                            value={worksheetTitle}
                            onChangeText={setWorksheetTitle}
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Upload Worksheet</Text>
                        <View style={styles.worksheetInputContainer}>
                            <TextInput
                                placeholder="Upload Worksheet"
                                value={worksheet}
                                onChangeText={setWorksheet}
                                style={[styles.input, styles.worksheetInput]}
                                placeholderTextColor="#999"
                                editable={false} // Make it non-editable
                            />
                            <Feather name="upload" size={24} color="black" style={styles.uploadIcon} onPress={handlePickDocument} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleAddHomework} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Homework</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    scrollContainer: {
        paddingBottom: 20,
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
    title: {
        marginTop:200,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        color: 'black',
        marginBottom: 5,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
    },
    input: {
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
    worksheetInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    uploadIcon: {
        position: 'absolute',
        right: 30,
    },
    worksheetInput: {
        paddingRight: 40,
        flex: 1,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    addButton: {
        backgroundColor: '#0C5481',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TeacherHomeWork;
