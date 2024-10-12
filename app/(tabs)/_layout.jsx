import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
      }}>

        <Tabs.Screen name='home'
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><Entypo name="home" 
          size={24} color={color} />
        }}
        />
        <Tabs.Screen name='explore'
         options={{
          tabBarLabel:'Explore',
          tabBarIcon:({color})=><AntDesign name="search1" 
          size={24} color={color} />
        }}/>
        <Tabs.Screen name='profile'
         options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="people-circle-outline" 
          size={24} color={color} />
        }}/>

    </Tabs>
  )
}