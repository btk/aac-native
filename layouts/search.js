import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity,TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Event from '../js/event';
import API from '../api';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount(){
    Event.on("showKeyboard", () => {
      this.textInput.focus();
    });

    Event.on("dismissKeyboard", () => {
      this.textInput.blur();
    });
  }

  render() {
    return (
      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: '#F1F1F1',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#F9F9F9",
            paddingHorizontal: 20,
            paddingLeft: 50,
            fontSize: 15,
            fontFamily: "rubik"
          }}
          ref={(input) => { this.textInput = input; }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholderTextColor={"#8E8E93"}
          autoCorrect={false}
          blurOnSubmit={true}
          autoCorrect={false}
          autoCapitalize={"none"}
          disableFullscreenUI={true}
          autoComplete={false}
          placeholder={API.UIText("justStartTyping")}
          onBlur={() => Event.emit("showMini")}
          onFocus={() => Event.emit("showFull")}
        />
        <View style={{position: "absolute", left: 11, top: 4}}>
          <MaterialCommunityIcons name="keyboard-outline" size={30} color="#999"/>
        </View>
      </View>
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
