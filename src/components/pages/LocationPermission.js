import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function LocationPermission() {
  const navigation = useNavigation();
  const [locationPermission, setLocationPermission] = useState(null);

  const handleShareLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        // Location permission granted
        navigation.navigate('GettingStarted');
      } else if (status === 'denied') {
        // Location permission denied
        Alert.alert(
          'Location Permission Required',
          'Please enable location services for this app in your device settings.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
      // Handle other status options as needed (e.g., 'undetermined', 'limited')
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        source={require('../logo/ExigentFinaleLocationPermission.png')}
        style={{
          width: 300,
          height: 300,
          marginTop: 50,
        }}
      />
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>What's Nearby?</Text>
      <Text style={{ fontSize: 15, textAlign: 'center', margin: 20, color: '#808080' }}>
        Hey there! Mind if we grab your location? It'll enhance your experience with personalized, location-based features.
      </Text>

      <View style={{ position: 'absolute', bottom: 0, width: '80%' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#3a88ed',
            padding: 20,
            borderRadius: 5,
            marginBottom: 30,
            width: '100%',
          }}
          onPress={handleShareLocation}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Share Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
