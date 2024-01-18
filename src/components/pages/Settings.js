import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>
        <Text>Sample 1</Text>
      </View>
      <View style={styles.containerTwo}>
        <Text>Sample 2</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
    },
    containerOne:{
        backgroundColor: 'green',
        height: 50,
        width: '50%',
    },
    containerTwo:{
        backgroundColor: 'blue',
        height: 50,
        width: '50%',
    }
});