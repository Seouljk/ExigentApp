import React from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function UserDetails() {
  const navigation = useNavigation();

  const handleHomePage = () => {
    // Logic here
    navigation.navigate('HomePage');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../logo/ExigentMagnifyingGlasses.png')}
            style={{
              width: 300,
              height: 300,
              marginTop: 30,
              marginRight: 25,
            }}
          />

          <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 20 }}> Let's Get Started! </Text>
          <Text style={{ fontSize: 15, textAlign: 'center', margin: 20, color: '#808080' }}>
            Welcome to Exigent! Set your distance, discover help nearby in a snap 
            because safety should be simple and close at hand. Ready to get started?
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#3a88ed',
            padding: 20,
            alignSelf: 'center',
            borderRadius: 5,
            marginBottom: 30,
            width: '80%',
          }}
          onPress={handleHomePage}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
