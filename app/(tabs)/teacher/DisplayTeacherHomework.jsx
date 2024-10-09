import React, { useEffect, useState } from 'react'; 
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { db } from '../../configs/FirebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const DisplayTeacherHomework = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    // Fetch all activities
    const fetchActivities = async () => {
        try {
            const activitiesCollection = collection(db, 'teacherActivities'); // Replace 'activities' with your Firestore collection name
            const activitiesSnapshot = await getDocs(activitiesCollection);
            const activitiesList = activitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setActivities(activitiesList);
        } catch (error) {
            console.log('Error fetching activities', error);
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

    // Function to handle deletion of homework
    const handleDeleteHomework = async (activityId) => {
        Alert.alert(
            'Delete Homework',
            'Are you sure you want to delete this homework?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'teacherActivities', activityId)); // Replace 'activities' with your Firestore collection name
                            fetchActivities(); // Refresh the list
                            Alert.alert('Success', 'Homework deleted successfully!'); // Show success alert
                        } catch (error) {
                            console.log('Error deleting homework', error);
                            Alert.alert('Error', 'Could not delete homework');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ImageBackground
            source={require('../../assets/teacherbackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
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
                <Text style={styles.title}>Home Works</Text>
                {activities.map(activity => (
                    <ImageBackground 
                        key={activity.id} 
                        source={require('../../assets/parentbackground.png')} 
                        style={styles.card}
                        imageStyle={{ borderRadius: 10 }} 
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{activity.title}</Text>
                            <TouchableOpacity 
                                style={styles.cardButton} 
                                onPress={() => navigation.navigate('Worksheet', { worksheet: activity.worksheet })} // Navigate to the worksheet
                            >
                                <Text style={styles.buttonText}>Success</Text> 
                            </TouchableOpacity>
                        </View>

                        <Image 
                            source={require('../../assets/homecard.png')} 
                            style={styles.cardBottomImage} 
                        />
                        
                        {/* Icons Section */}
                        <View style={styles.icons}>
                            {/* Edit Icon */}
                            <TouchableOpacity 
                                style={styles.iconButton}
                                onPress={() => navigation.navigate('EditActivity', { activityId: activity.id })} // Pass the activity ID
                            >
                                <MaterialIcons name="edit-square" size={24} color="black" />
                            </TouchableOpacity>

                            {/* Delete Icon */}
                            <TouchableOpacity 
                                style={styles.iconButton} 
                                onPress={() => handleDeleteHomework(activity.id)} // Call delete function
                            >
                                <Ionicons name="remove-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
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

export default DisplayTeacherHomework;

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
    icons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: -30,
    },
    cardBottomImage: {
        width: 180,  
        height: 180, 
        position: 'absolute',
        right: 60,   
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
});
