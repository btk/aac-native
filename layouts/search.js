import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity,TextInput } from 'react-native';

import Event from '../js/event';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <TextInput
        style={{
          height: 40,
          borderColor: '#F1F1F1',
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: "#F9F9F9",
          paddingHorizontal: 20,
          fontSize: 15,
          fontFamily: "rubik"
        }}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        placeholderTextColor={"#8E8E93"}
        placeholder={"Just start typing..."}
        onFocus={() => Event.emit("showFull")}
      />
    );
  }
}

const styles = StyleSheet.create({
  carrier: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%"
  },
  carrierSV: {
    width: "100%",
    height: Dimensions.get("window").height - 50
  }
});
