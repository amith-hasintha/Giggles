import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from './../configs/FirebaseConfig';  // Ensure this is the path to your firebaseConfig.js
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    // Fetch users from Firestore when the component is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const usersCollection = collection(db, "users");
                    const userSnapshot = await getDocs(usersCollection);
                    const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setUsers(usersList);
                    console.log("Fetched users:", usersList);
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }, [])
    );

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        const trimmedEmail = email.trim().toLowerCase();
        const user = users.find((u) => u.email.trim().toLowerCase() === trimmedEmail);

        if (!user) {
            Alert.alert("Error", "Invalid email.");
            return;
        }

        if (user.password !== password) {
            Alert.alert("Error", "Incorrect password.");
            return;
        }

        if (user.user_Type === "parent" && user.studentId) {
            try {
                await AsyncStorage.setItem('studentId', user.studentId);
            } catch (error) {
                console.error("Error saving student ID to AsyncStorage:", error);
            }
        }

        switch (user.user_Type) {
            case "teacher":
                navigation.navigate("TeacherHomePage", { userEmail: user.email });
                break;
            case "parent":
                navigation.navigate("ParentHomePage", { userEmail: user.email });
                break;
            default:
                navigation.navigate("/", { userEmail: user.email });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('./../assets/background.png')}  // Ensure you have the correct path to your background image
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Logo */}
                <Image 
                    source={require('./../assets/logo.png')}  // Ensure you have the correct path to your logo
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>
                    Don't have an account?{" "}
                    <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent overlay
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    logo: {
        width: '100%',   // Adjust the width and height of your logo as needed
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    loginButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    signupText: {
        marginTop: 30,
        fontSize: 16,
        color: "#333",
    },
    signupLink: {
        color: "#4CAF50",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Login;
