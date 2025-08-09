// Navigation.js
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import ItemsScreen from './screens/ItemsScreen';
import { ListItem } from './screens/ListItem';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ItemsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={newspaper} style={{ width: size, height: size, tintColor: color }} />
          ),
          headerShown: false, // Hide header for this screen
        }}
      />
      <Tab.Screen
        name="List Item"
        component={ListItem}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={bell} style={{ width: size, height: size, tintColor: color }} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
      <Stack.Navigator>
        {/* Main tabs (no header from Stack, use Tab headers) */}
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
  );
}
