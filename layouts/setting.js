import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';

import API from '../api';

export default class Setting extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.carrier}>
        <TouchableOpacity onPress={() => API.event.emit("setting", false)}><Text>Close</Text></TouchableOpacity>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carrier: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%"
  }
});
