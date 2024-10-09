import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './(tabs)/_layout';
//import RootLayout from './_layout';

const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    );
};

export default App;
