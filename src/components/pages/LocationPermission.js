import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LocationPermission() {
  const navigation = useNavigation();

  const handleShareLocation = () => {
    // Logic here
    navigation.navigate('UserDetails');
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
      <Text style={{ fontSize: 15, textAlign: 'center', marginHorizontal: 20, marginTop: 25, color: '#808080' }}>
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
