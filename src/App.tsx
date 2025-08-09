import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReduxProvider } from './providers/ReduxProvider';
import Navigation from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

function Main() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export function App() {
  return (
    <ReduxProvider>
      <Main />
    </ReduxProvider>
  );
}
