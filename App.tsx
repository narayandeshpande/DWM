import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Todo from './screens/Todo';
import Note from './screens/Note';
import Details from './screens/Details';
import Add from './screens/Add';
import {WorkProvider} from './context/WorkContext'

const App = () => {
  
  const Tab = createBottomTabNavigator()
  return (
    <WorkProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }:any) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }:any) => {
            let iconName: string = '';

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Details') iconName = 'infocirlceo';
            else if (route.name === 'Todo') iconName = 'checkcircleo';
            else if (route.name === 'Note') iconName = 'filetext1'
            else if (route.name === 'Add') iconName = 'pluscircle'
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#222',
            borderTopWidth: 0,
            height: 60,
          }
        })}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Todo' component={Todo} />
        <Tab.Screen name="Note" component={Note} />
        <Tab.Screen name='Add' component={Add} />
        <Tab.Screen name='Details' component={Details} />
      </Tab.Navigator>
    </NavigationContainer>
    </WorkProvider>
  )
}

export default App

const styles = StyleSheet.create({})