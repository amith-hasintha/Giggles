
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherHome from './teacher/TeacherHome';
import TeacherHomeWork from './teacher/TeacherHomeWork';
import DisplayTeacherHomework from './teacher/DisplayTeacherHomework';
import EditActivity from './teacher/EditActivity';
import Feedbacks from './teacher/Feedbacks';
import ParentHome from './parents/ParentHome';
import DisplayParentHomework from './parents/DisplayParentHomework';
import WorkSheet from './parents/WorkSheet';
import Ratings from './parents/Ratings';
import Homepg1 from './Homepg1';
import Homepg2 from './Homepg2';
import Homepg3 from './Homepg3';
import Homepg4 from './Homepg4';
import TeacherHomePage from './teacher/TeacherHomePage';
import ParentHomePage from './parents/ParentHomePage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        
        <Tab.Navigator>
            <Tab.Screen 
            name="Homepg1" 
            component={Homepg1} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Homepg2" 
            component={Homepg2} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Homepg3" 
            component={Homepg3} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Homepg4" 
            component={Homepg4} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="TeacherHomePage" 
            component={TeacherHomePage} 
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="ParentHomePage" 
            component={ParentHomePage} 
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



