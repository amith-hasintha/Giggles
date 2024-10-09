import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Both({ navigation }) {
  return (
    <ImageBackground
            
        >
            <View style={styles.fixedHeader}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}><Feather name="arrow-left-circle" size={24} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.pageTitle}>Activities</Text>
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('TeacherHome')}
                    >
                        
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>Teacher</Text>
                               
                            </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ParentHome')}
                        // onPress={() => navigation.navigate('Parent')}
                    >
                        
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>Parent</Text>
                               
                            </View>
                        
                    </TouchableOpacity>

                    
                </View>
                
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
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
        marginBottom:30
    },
    cardContainer: {
        flexDirection: 'column',  
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    card: {
        width: '100%', 
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        marginBottom: 50, 
    },
    cardBackground: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        flexDirection: 'row', 
    },
    cardContent: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%',
    },
    cardText: {
        fontSize: 20,
        color: '#304F62',
        fontWeight: 'bold',
        textAlign: 'left', 
        flex: 1, 
    },
    cardImage: {
        width: 80,
        height: 110,
        alignSelf: 'center',
    },
    birdImage: {
        width: 100,
        height: 100,
        marginLeft: 10,
        marginTop: 20,
    },
});
