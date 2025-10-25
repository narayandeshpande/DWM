import React, { useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { WorkProvider } from './context/WorkContext';
import Todo from './screens/Todo';
import Note from './screens/Note';
import Add from './screens/Add';
import Details from './screens/Details';
import Home from './screens/Home';
import { requestNotificationPermission, scheduleAlarm } from './utils/notificationService';
import { scheduleDailyReminder } from './utils/notificationService';


// ----- Home Screen -----

// Import notification functions

// const Home = () => {
//   useEffect(() => {
//     // Request notification permission once when Home mounts
//     requestNotificationPermission();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Test Alarm (10 sec)" onPress={() => scheduleAlarm(10)} />

//       <Button title="Test Alarm (1 min)" onPress={() => scheduleAlarm(60)} style={{ marginTop: 10 }} />
//     </View>
//   );
// };

// ----- Bottom Tabs -----
const Tab = createBottomTabNavigator();

const App = () => {

  useEffect(() => {
    requestNotificationPermission()
    scheduleDailyReminder()
    // scheduleAlarm(10)
  }, [])

  return (
    <WorkProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName = '';
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Details') iconName = 'infocirlceo';
              else if (route.name === 'Todo') iconName = 'checkcircleo';
              else if (route.name === 'Note') iconName = 'filetext1';
              else if (route.name === 'Add') iconName = 'pluscircle';
              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#222',
              borderTopWidth: 0,
              height: 60,
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Todo" component={Todo} />
          <Tab.Screen name="Note" component={Note} />
          <Tab.Screen name="Add" component={Add} />
          <Tab.Screen name="Details" component={Details} />
        </Tab.Navigator>
      </NavigationContainer>
    </WorkProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
