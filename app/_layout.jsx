import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load fonts from both codebases
  const [fontsLoaded] = useFonts({
    'Unkempt': require('./../assets/fonts/Unkempt-Bold.ttf'),
    'Poppins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-medium': require('./../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-semibolditalic': require('./../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'irish': require('./../assets/fonts/IrishGrover-Regular.ttf'),
    'inter': require('./../assets/fonts/Inter_18pt-Italic.ttf'),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return loading screen if fonts aren't loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        
          
        
    </ThemeProvider>
  );
}
