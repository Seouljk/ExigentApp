import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { Searchbar, Icon } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [setMapRegion] = useState(null);
  const mapRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [SelectedCategoryColor,setSelectedCategoryColor] = useState(null);
  const [destination, setDestination] = useState(null);
  

  const [policeStations, setPoliceStations] = useState([]);
  const [hospitalStations, setHospitalStations] = useState([]);
  const [fireStations, setFireStations] = useState([]);
  const resetDestination = () => {
    setDestination(null);
  };
  

  const handleSearchQueryChange = (searchQuery) => {
    setSearchQuery(searchQuery);
  
    // Reset all station data and selected category when a new search query is entered
    setPoliceStations([]);
    setHospitalStations([]);
    setFireStations([]);
    setSelectedCategory(null);
  
    if (
      searchQuery.toLowerCase() === 'police' ||
      searchQuery.toLowerCase() === 'police station'
      || searchQuery.toLowerCase() === 'police stations'
    ) {
      // Search for police stations near the current location
      searchNearbyPlaces('police_station', 1000).then((result) => {
        setPoliceStations(result);
        setSelectedCategory('PoliceStation');
        setSelectedCategoryColor('#0000FF'); // Set the selected category color to blue
        setSearchQuery('');
      });
    } else if (
      searchQuery.toLowerCase() === 'hospital' ||
      searchQuery.toLowerCase() === 'hospitals'
      ) {
      // Search for hospitals near current location
      searchNearbyPlaces('hospital', 1000).then((result) => {
        setHospitalStations(result);
        setSelectedCategory('Hospital');
        setSelectedCategoryColor('#0000FF'); // Set the selected category color to blue
        setSearchQuery('');
      });
    } else if (
      searchQuery.toLowerCase() === 'fire station' ||
      searchQuery.toLowerCase() === 'fire stations'
    ) {
      // Search for fire stations near current location
      searchNearbyPlaces('fire_station', 1000).then((result) => {
        setFireStations(result);
        setSelectedCategory('FireStation');
        setSelectedCategoryColor('#0000FF'); // Set the selected category color to blue
        setSearchQuery('');
      });
    } else {
      // Perform the regular filtering based on the search query
      const filterStations = (stations) =>
        stations.filter((station) =>
          station.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
      setPoliceStations(filterStations(policeStations));
      setHospitalStations(filterStations(hospitalStations));
      setFireStations(filterStations(fireStations));
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 5 },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  const handleButtonPress = (value, label) => {
    console.log(`Button pressed: ${value}`);
    if (value === 'SettingDistance' && location) {
      // Set the map region directly
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 300);
    }


    if (value === 'Clear') {
      // Clear all stations and reset destination
      setPoliceStations([]);
      setHospitalStations([]);
      setFireStations([]);
      setSelectedCategory(null);
      setSearchQuery('');
      resetDestination(); // Call the resetDestination function
    }
   // Handle specific button press actions
  if (value === 'PoliceStation') {
    searchNearbyPlaces('police', 1000 ).then((result) => {
      setPoliceStations(result);
      setSelectedCategory('PoliceStation');
      setSelectedCategoryColor('#0000FF'); // Set the selected category color to blue
      setSearchQuery('');
    });
  }
  if (value === 'Hospital') {
    searchNearbyPlaces('hospital', 1000).then((result) => {
      setHospitalStations(result);
      setSelectedCategory('Hospital');
      setSelectedCategoryColor('#0000FF'); // Set the selected category color to blue
      setSearchQuery('');
    });
  }
  if (value === 'FireStation') {
    searchNearbyPlaces('fire_station', 1000).then((result) => {
      setFireStations(result);
      setSelectedCategory('FireStation');
      setSelectedCategoryColor('#0000FF'); // Set the selected category color to blue
      setSearchQuery('');
    });
  }
};
  

const searchNearbyPlaces = async (placeType, radius = 5000) => {
  if (location) {
    const apiKey = 'AIzaSyAU3XsFhS2J4hVKFOXtyPgB_XI6AwNQGow';
    const radius = 5000; // 5000 meters (adjust as needed)
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${placeType}&key=AIzaSyAU3XsFhS2J4hVKFOXtyPgB_XI6AwNQGow`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Log the entire response
      console.log('API Response:', data);

      // Handle the data (e.g., display markers on the map)
      if (data.results && data.results.length > 0) {
        const places = data.results.map((result) => ({
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          title: result.name,
          description: result.vicinity,
        }));

        // Now you can use 'places' to display markers on the map
        console.log('Nearby Places:', places);
        return places;
      } else {
        console.log('No nearby places found.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      return [];
    }
  }
  return [];
  };

  // Update the onRegionChange event handler
  const handleMapRegionChange = (region) => {
    // Mark that the map is currently being interacted with
    setMapRegion(region);

    // Recentering the map to the current location
    if (location) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      }, 300);
    }
  };

  return (
    <View style={styles.container}>

      <MapView ref={(ref) => (mapRef.current = ref)} style={styles.map}
      showsUserLocation={true}
>
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
         {selectedCategory === 'PoliceStation' && policeStations.map((station, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.title}
      description={station.description}
      pinColor="#0000FF" // Set the pin color based on the selected category color
      onPress={() => setDestination({ latitude: station.latitude, longitude: station.longitude })}
    />
  ))}
  {selectedCategory === 'Hospital' && hospitalStations.map((station, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.title}
      description={station.description}
      pinColor="#0000FF" // Set the pin color based on the selected category color
      onPress={() => setDestination({ latitude: station.latitude, longitude: station.longitude })}
    />
  ))}
  {selectedCategory === 'FireStation' && fireStations.map((station, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.title}
      description={station.description}
      pinColor="#0000FF" // Set the pin color based on the selected category color
      onPress={() => setDestination({ latitude: station.latitude, longitude: station.longitude })}
    />
  ))}
  {location && destination && (
          <MapViewDirections
            origin={{ latitude: location.latitude, longitude: location.longitude }}
            destination={destination}
            apikey={'AIzaSyAU3XsFhS2J4hVKFOXtyPgB_XI6AwNQGow'}
            strokeWidth={3}
            strokeColor="green"
          />
        )}
      </MapView>
      <View style={styles.contentContainer}>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={(searchQuery) => {
             setSearchQuery(searchQuery);
             handleSearchQueryChange(searchQuery);
            }}
           value={searchQuery}
            style={styles.searchBar}
          />
        </View>
        <View style={styles.horizontalScrollView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Clear', 'Clear')}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Hospital', 'Hospital')}
            >
              <Text style={styles.buttonText}>Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('PoliceStation', 'Police Station')}
            >
              <Text style={styles.buttonText}>Police Station</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('FireStation', ' Fire Station')}
            >
              <Text style={styles.buttonText}>Fire Station</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <View style={styles.cardContainer}>
      <View style={styles.action}>
        <View style={styles.actionOne}>
          <TouchableOpacity
            style={styles.buttonMain}
            onPress={() => handleButtonPress('SettingDistance')}
          >
            <Image
              source={require('../logo/ExigentFinale2.png')}
              style={{
                width: 65,
                height: 65,
              }}
            />
          </TouchableOpacity>
        </View>
            </View>
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
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,

  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 10,
    elevation: 3,
    backgroundColor: 'transparent', // Make the background transparent
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
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
    height: 70,
    width: '90%',
    borderRadius: 20,
    marginBottom: 30,
    alignSelf: 'center',
    elevation: 3,
  },
  buttonMain:{
    backgroundColor: '#3a88ed',
    borderRadius: 50,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
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
    marginBottom: -30,
    height: 20,
  },
  actionOne: {
    marginBottom: 50,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
});

export default App;
