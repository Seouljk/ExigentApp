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
            source={require('../logo/ExigentFinale.png')}
            style={{
              width: 120,
              height: 120,
              marginTop: 30,
            }}
          />

          <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Welcome! </Text>
          <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 20, color: '#808080' }}>
            Mind if we grab small details from you?
          </Text>

          <TextInput
            mode="outlined"
            label="Full Name"
            style={{
              width: '80%',
              marginBottom: 5,
            }}
          />

          <TextInput
            mode="outlined"
            label="Sex"
            style={{
              width: '80%',
              marginBottom: 5,
            }}
          />

          <TextInput
            mode="outlined"
            label="Birthday"
            style={{
              width: '80%',
              marginBottom: 5,
            }}
          />

          <TextInput
            mode="outlined"
            label="Full Address"
            style={{
              width: '80%',
            }}
          />
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
