import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
let { height, width } = Dimensions.get('window');
import Event from "../js/event";

import Child from './child';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
    Event.addListener("announce", (data) => {
      this.setState({data});
      setTimeout(() => {
        this.setState({data: null});
      }, 2000);
    });
  }

  render() {
    if(this.state.data){
      return (
        <View style={styles.announcer}>
          <View>
            <Child tan="#FFE1B2" hair="#734A3E" eye="#623F33" shirt="#a94f4f"/>
          </View>
          <View>
            <Text>{`I want to eat ${this.state.data.title}`}</Text>
          </View>
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  announcer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  }
});
