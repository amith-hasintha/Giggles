import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { ActivityIndicator, View} from "react-native";
import Login from "./(tabs)/Login";
import SignUp from "./(tabs)/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function RootLayout() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Unkempt': require('./../assets/fonts/Unkempt-Bold.ttf'),
    'Poppins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-medium': require('./../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-semibolditalic': require('./../assets/fonts/Poppins-SemiBoldItalic.ttf'),
  });

  // If fonts are not yet loaded, return a loading screen
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (

        <Stack screenOptions={{ headerShown: false }}>
          {/* The screen component will be automatically resolved from the app/tabs directory */}
          <Stack.Screen name="(tabs)" />
          
        </Stack>
  );
}
