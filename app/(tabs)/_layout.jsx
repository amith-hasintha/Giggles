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
import DailyUpdateForm from './teacher/AddDailyUpdate'; 
import DisplayDailyUpdates from './teacher/DisplayDailyUpdates';
import UpdateDailyUpdate from './teacher/UpdateDailyUpdate';
import SignUp from './SignUp';
import Login from './Login';
import DailyUpdates from './parents/DailyUpdates';
import AddPaymentForm from './teacher/AddPayment';
import DisplayPayments from './teacher/DisplayPayments';
import UpdatePayment from './teacher/UpdatePayment';
import Payments from './parents/Payments';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        
            
        <Tab.Navigator>
            <Tab.Screen 
                name="Login" 
                component={Login} 
                options={{ 
                    headerShown: false,
                    //tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Homepg1" 
                component={Homepg1} 
                options={{ 
                    headerShown: false,
                    //tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Homepg2" 
                component={Homepg2} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Homepg3" 
                component={Homepg3} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Homepg4" 
                component={Homepg4} 
                options={{ 
                    headerShown: false,
                    //tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="TeacherHomePage" 
                component={TeacherHomePage} 
                options={{ 
                    headerShown: false,
                    //tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="ParentHomePage" 
                component={ParentHomePage} 
                options={{ 
                    headerShown: false,
                    //tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="TeacherHome" 
                component={TeacherHome}
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }} 
            />
            <Tab.Screen 
                name="TeacherHomeWork" 
                component={TeacherHomeWork} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="DisplayTeacherHomework" 
                component={DisplayTeacherHomework} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="EditActivity" 
                component={EditActivity} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Feedbacks" 
                component={Feedbacks} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="ParentHome" 
                component={ParentHome} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="DisplayParentHomework" 
                component={DisplayParentHomework} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="WorkSheet" 
                component={WorkSheet} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen 
                name="Ratings" 
                component={Ratings} 
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="DailyUpdateForm"
                component={DailyUpdateForm}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="DisplayDailyUpdates"
                component={DisplayDailyUpdates}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="UpdateDailyUpdate"
                component={UpdateDailyUpdate}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="SignUp"
                component={SignUp}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="DailyUpdates"
                component={DailyUpdates}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="AddPaymentForm"
                component={AddPaymentForm}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="DisplayPayments"
                component={DisplayPayments}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="UpdatePayment"
                component={UpdatePayment}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="Payments"
                component={Payments}   // The Daily Update Form we created earlier
                options={{ 
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
