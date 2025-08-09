// Navigation.js
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Your screens (replace paths if needed)
import { Home } from './screens/Home';
import { Updates } from './screens/Updates';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { NotFound } from './screens/NotFound';

// --- Tab icons (replace with your images)
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';

// -----------------------------
// 1) Bottom Tabs (Home + Updates)
// -----------------------------
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
        component={Home}
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Image source={newspaper} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Updates"
        component={Updates}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={bell} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// -----------------------------
// 2) Root Stack
// - Hosts tabs as the main screen
// - Profile as a normal push screen
// - Settings shown as a modal
// - NotFound fallback
// -----------------------------
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Main tabs (no header from Stack, use Tab headers) */}
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />

        {/* Normal push screen */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />

        {/* Modal group (iOS-style sheet on iOS, normal on Android by default) */}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: 'Settings' }}
          />
        </Stack.Group>

        {/* Fallback screen */}
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{ title: '404' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
USAGE NOTES
-----------
- Place <Navigation /> in your App.js:
    export default function App() { return <Navigation />; }

- Navigate to screens:
    // From anywhere with access to `navigation`:
    navigation.navigate('Profile');       // push Profile
    navigation.navigate('Settings');      // open modal

- Pass params:
    navigation.navigate('Profile', { userId: '123' });

- Add deep linking later (optional) by passing `linking` to <NavigationContainer />.
*/