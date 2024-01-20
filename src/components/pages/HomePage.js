import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { Searchbar, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  const handleSettings = () => {
    // Logic here
    navigation.navigate('Settings');
  };

  const handleButtonPress = (value) => {
    // Button Logic Here
    console.log(`Button pressed: ${value}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>

        {/* Search Bar w/ Settings */}

        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          {/* <TouchableOpacity
            style={styles.buttonSetting}
            onPress={handleSettings}
          >
            <Image
              source={require('../logo/settings.png')}
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
          {/* </TouchableOpacity> */}
        </View>

        {/* Fast Location Buttons */}

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
      </View>
      
      {/* Buttons Below */}

      <View style={styles.cardContainer}>
        <View style={styles.action}>
          {/* <TouchableOpacity
            style={styles.buttonSetOne}
            onPress={() => handleButtonPress('History')}
          >
            <Icon
              source="history"
              size={30}
              color= 'gray'
            />
          </TouchableOpacity> */}
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
          {/* <TouchableOpacity
            style={styles.buttonSetTwo}
            onPress={() => handleButtonPress('UserAccount')}
          >
            <Icon
              source="account"
              size={30}
              color= 'gray'
            />
          </TouchableOpacity> */}
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
  buttonMain:{
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
