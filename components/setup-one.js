import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient, Svg } from 'expo';

import API from '../api';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.holder}>
        <Image source={require("../assets/list.png")} style={{width: 150, height: 150, alignSelf: "center", margin: "10%"}}/>
        <View>
          <Text style={styles.holderTitle}>{API.UIText("setupOneHeading")}</Text>
          <Text style={styles.holderContent}>{API.UIText("setupOneContent1")}</Text>
          <Text style={styles.holderContent}>{API.UIText("setupOneContent2")}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.button(true, 1)} style={styles.button}>
          <Text style={styles.buttonText}>{API.UIText("setupOneButton")}</Text>
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
