import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const ParentHome = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.phfixedHeader}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ParentHomePage')}>
                        <Text style={styles.backButton}><Feather name="arrow-left-circle" size={24} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.afterHeaderImage}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.pageTitle}>Enjoy Your HomeWork...</Text>
                
                <Image
                    source={require('../../assets/parenthome.png')}
                    style={styles.parentImage}
                />
                
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('DisplayParentHomework')} // Ensure this matches the registered name
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>

                <Image
                    source={require('../../assets/homebird.png')}
                    style={styles.birdImage}
                />
            </ScrollView>
        </ImageBackground>
    );
}

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
    pageTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        fontFamily:'Unkempt'
    },
    parentImage: {
        width: 250, 
        height: 250, 
        marginTop: 10, 
        alignSelf: 'center', 
    },
    button: {
        backgroundColor: '#6B9AB6', 
        padding: 15,
        borderRadius: 5,
        marginTop: 50,
        alignSelf: 'center',
        width: '60%', 
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    birdImage: {
        width: 70,
        height: 70,
        marginLeft: 280,
        marginTop: 40,
    },
});

export default ParentHome;
