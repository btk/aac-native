import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient, Svg } from 'expo';

import API from '../../api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: null
    }
  }

  componentWillMount(){
    API.getData("name").then(name => {
      console.log(name);
      this.setState({name});
    });
  }

  render() {
    return (
      <View style={styles.holder}>
        <Image source={require("../../assets/congrats.png")} style={{width: 140, height: 140, alignSelf: "center", margin: "10%"}}/>
        <View>
          <Text style={styles.holderTitle}>{API.UIText("setupFiveHeading")}, {this.state.name}!</Text>
          <Text style={styles.holderContent}>{API.UIText("setupFiveContent")}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.button("finish", 1)} style={styles.button}>
          <Text style={styles.buttonText}>{API.UIText("setupFiveButton")}</Text>
        </TouchableOpacity>
        <Text style={styles.copy}>Dream Oriented Inc.</Text>
      </View>
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
