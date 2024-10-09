
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Both from './Both';
import TeacherHome from './teacher/TeacherHome';
import TeacherHomeWork from './teacher/TeacherHomeWork';
import DisplayTeacherHomework from './teacher/DisplayTeacherHomework';
import EditActivity from './teacher/EditActivity';
import Feedbacks from './teacher/Feedbacks';
import ParentHome from './parents/ParentHome';
import DisplayParentHomework from './parents/DisplayParentHomework';
import WorkSheet from './parents/WorkSheet';
import Ratings from './parents/Ratings';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Both" 
            component={Both} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="TeacherHome" 
            component={TeacherHome}
            options={{ headerShown: false }} 
            />
            <Tab.Screen name="TeacherHomeWork" 
            component={TeacherHomeWork} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="DisplayTeacherHomework" 
            component={DisplayTeacherHomework} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="EditActivity" 
            component={EditActivity} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Feedbacks" 
            component={Feedbacks} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="ParentHome" 
            component={ParentHome} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="DisplayParentHomework" 
            component={DisplayParentHomework} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="WorkSheet" 
            component={WorkSheet} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Ratings" 
            component={Ratings} 
            options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;



