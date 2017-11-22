import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { LinearGradient, Svg } from 'expo';

import API from '../../api';
import Avatar from '../../assets/avatar';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
    }
    API.getData("avatar").then(avatar => { this.setState({avatar}); });
  }

  componentDidMount(){
    setTimeout(() => {
      this.refs.textInput.focus();
    }, 500);
  }

  setName(){
    if(this.state.text){
      API.setData("name", this.state.text);
      API.segment.trackWithProperties("setName", {name: this.state.text});
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.holder} behavior="padding">
        <Image source={Avatar[this.state.avatar + "_png"]} style={{width: 140, height: 140, alignSelf: "center", margin: "10%"}}/>
        <View>
          <Text style={styles.holderTitle}>{API.UIText("setupThreeHeading")}</Text>
          <Text style={styles.holderContent}>{API.UIText("setupThreeContent")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={API.UIText("setupThreeInput")}
            ref={'textInput'}
          />
        </View>
        <TouchableOpacity onPress={() => { this.setName(); this.props.button(true, 3); }} style={styles.button}>
          <Text style={styles.buttonText}>{API.UIText("setupZeroButton")}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "space-around"
  },
  holderTitle: {
    width: "80%",
    color: "#00b2d6",
    fontSize: 24,
    margin: "10%",
    marginTop: "0%",
    marginBottom: "5%",
    fontWeight: "700",
    textAlign: "center"
  },
  holderContent: {
    width: "80%",
    color: "#687782",
    fontSize: 18,
    marginHorizontal: "10%",
    marginBottom: "5%",
    textAlign: "center"
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#00b2d6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: "10%"
  },
  input: {
    width: "80%",
    height: 40,
    fontSize: 18,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    textAlign: "center",
    borderColor: "#eee",
    marginHorizontal: "10%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  copy: {
    color: "#bbb",
    textAlign: "center"
  }
});
