import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function RootLayout() {
  useFonts({
    'Unkempt':require('./../assets/fonts/Unkempt-Bold.ttf'),
    'Poppins-bold':require('./../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-medium':require('./../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-regular':require('./../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-semibolditalic':require('./../assets/fonts/Poppins-SemiBoldItalic.ttf'),
  })
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <Stack screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
    </ClerkProvider>
  );
}

