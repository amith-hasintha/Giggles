import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const ParentHome = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.phbackground}
            resizeMode="cover"
        >
            <View style={styles.phfixedHeader}>
                <View style={styles.phheaderContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ParentHomePage')}>
                        <Text style={styles.phbackButton}><Feather name="arrow-left-circle" size={24} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.phafterHeaderImage}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.phpageTitle}>Enjoy Your HomeWork...</Text>
                
                <Image
                    source={require('../../assets/parenthome.png')}
                    style={styles.phparentImage}
                />
                
                <TouchableOpacity 
                    style={styles.phbutton} 
                    onPress={() => navigation.navigate('DisplayParentHomework')} // Ensure this matches the registered name
                >
                    <Text style={styles.phbuttonText}>Start</Text>
                </TouchableOpacity>

                <Image
                    source={require('../../assets/homebird.png')}
                    style={styles.phbirdImage}
                />
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    phbackground: {
        flex: 1,
    },
    phfixedHeader: {
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
    phheaderContainer: {
        padding: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    phbackButton: {
        fontSize: 18,
        color: 'black',
    },
    phafterHeaderImage: {
        width: '100%',
        height: 110,
        resizeMode: 'cover',
    },
    phscrollContainer: {
        paddingTop: 170,
        paddingBottom: 30,
    },
    phpageTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        fontFamily:'Unkempt'
    },
    phparentImage: {
        width: 250, 
        height: 250, 
        marginTop: 10, 
        alignSelf: 'center', 
    },
    phbutton: {
        backgroundColor: '#6B9AB6', 
        padding: 15,
        borderRadius: 5,
        marginTop: 50,
        alignSelf: 'center',
        width: '60%', 
    },
    phbuttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    phbirdImage: {
        width: 70,
        height: 70,
        marginLeft: 280,
        marginTop: 40,
    },
});

export default ParentHome;
