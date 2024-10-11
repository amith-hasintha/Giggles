import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
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
                    const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Include user ID
                    setUsers(usersList);

                    // Log the fetched users for debugging
                    console.log("Fetched users:", usersList);
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();

            // Cleanup function (if needed) can be returned here
        }, [])
    );

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
    
        // Trim and compare email in a case-insensitive manner
        const trimmedEmail = email.trim().toLowerCase();
        const user = users.find((u) => u.email.trim().toLowerCase() === trimmedEmail);
    
        if (!user) {
            Alert.alert("Error", "Invalid email.");
            return;
        }
    
        // Check password
        if (user.password !== password) {
            Alert.alert("Error", "Incorrect password.");
            return;
        }
    
        // Save student ID in AsyncStorage if the user is a parent
        if (user.user_Type === "parent") {
            if (user.studentId) { // Use the correct key here
                try {
                    await AsyncStorage.setItem('studentId', user.studentId); // Save the student ID
                    console.log("Student ID saved to AsyncStorage:", user.studentId);
                } catch (error) {
                    console.error("Error saving student ID to AsyncStorage:", error);
                }
            } else {
                console.error("Student ID is undefined for user:", user); // Log if studentId is undefined
            }
        }
    
        // Navigate based on user type
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
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none" // Disable auto-capitalization for email
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Text style={styles.signupText}>
                Don't have an account?{" "}
                <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    signupText: {
        marginTop: 20,
        textAlign: "center",
    },
    signupLink: {
        color: "blue",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Login;
