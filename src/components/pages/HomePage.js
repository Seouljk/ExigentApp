import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { Searchbar, Icon } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Set the initial map region based on the current location
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSettings = () => {
    // Logic here
    navigation.navigate('Settings');
  };

  const handleButtonPress = (value) => {
    // Button Logic Here
    console.log(`Button pressed: ${value}`);
    if (value === 'SettingDistance' && location) {
      // Set the map region to the current location
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here"
          />
        )}
      </MapView>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>
        <View style={styles.horizontalScrollView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('MyHome')}
            >
              <Text style={styles.buttonText}>My Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Hospital')}
            >
              <Text style={styles.buttonText}>Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('PoliceStation')}
            >
              <Text style={styles.buttonText}>Police Station</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('FireStation')}
            >
              <Text style={styles.buttonText}>Fire Station</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('TanodOutpost')}
            >
              <Text style={styles.buttonText}>Tanod Outpost</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('OroRescue')}
            >
              <Text style={styles.buttonText}>Oro Rescue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSetOne}
          onPress={() => handleButtonPress('History')}
        >
          <Icon
            source="history"
            size={30}
            color= 'gray'
          />
        </TouchableOpacity>
        <View style={styles.actionOne}>
          <TouchableOpacity
            style={styles.buttonMain}
            onPress={() => handleButtonPress('SettingDistance')}
          >
            <Image
              source={require('../logo/ExigentFinale2.png')}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonSetTwo}
          onPress={() => handleButtonPress('UserAccount')}
        >
          <Icon
            source="account"
            size={30}
            color= 'gray'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbdbdb',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '80%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 100, // Add padding to prevent content from being covered by buttons
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 10,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonSetting: {
    height: 55,
    width: 55,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 3,
  },
  horizontalScrollView: {
    position: 'absolute',
    top: 80,
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingHorizontal: 0,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    backgroundColor: '#3a88ed',
  },
  buttonText: {
    color: 'white',
  },
  cardContainer: {
    backgroundColor: 'white',
    height: 60,
    width: '90%',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 3,
  },
  buttonMain: {
    backgroundColor: '#3a88ed',
    borderRadius: 50,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSetOne: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  buttonSetTwo: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  actionOne: {
    marginBottom: 50,
    backgroundColor: '#dbdbdb',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
});

export default App;
