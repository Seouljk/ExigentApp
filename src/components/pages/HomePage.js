import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';

const MyComponent = ({ setSearchQuery, searchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
    />
  );
};

const HomePage = () => {
  return <View />;
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleButtonPress = (value) => {
    // Handle button press logic here
    console.log(`Button pressed: ${value}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MyComponent setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        {searchQuery.length === 0 && <HomePage />}
        {/* You can add logic here based on the search query */}
      </View>

      {/* Set of buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('home')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('hospital')}
        >
          <Text style={styles.buttonText}>Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('ambulance')}
        >
          <Text style={styles.buttonText}>Ambulance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#e3e3e3',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10, // Add paddingBottom to provide space between content and buttons
  },
  button: {
    flex: 1,
    height: 100,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
  },
});

export default App;
