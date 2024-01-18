import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoadingPage() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('LocationPermission');
    }, 2000);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../logo/ExigentFinale.png')}
        style={{
          width: 120,
          height: 120,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
