import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationPermission from './src/components/pages/LocationPermission';
import HomePage from './src/components/pages/HomePage';
import UserDetails from './src/components/pages/UserDetails';
import LoadingPage from './src/components/pages/LoadingPage';
import Settings from './src/components/pages/Settings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
              options={{ headerShown: false }}
              name="LoadingPage"
              component={LoadingPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LocationPermission"
              component={LocationPermission}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="UserDetails"
              component={UserDetails}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomePage"
              component={HomePage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Settings"
              component={Settings}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
