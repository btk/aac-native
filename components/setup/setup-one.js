import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient, Svg } from 'expo';
let { height, width } = Dimensions.get('window');

import API from '../../api';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.holder}>
        <Image source={require("../../assets/list.png")} style={{width: 150, height: 150, alignSelf: "center", margin: "10%"}}/>
        <View style={{width: width > height ? "60%" : "100%", height: width > height ? "100%" : "70%", flexDirection: "column", justifyContent: "space-around"}}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    width: width,
    height: height,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "space-around",
    flexDirection: width > height ? "row": "column"
  },
  holderTitle: {
    width: "80%",
    color: "#00b2d6",
    fontSize: 24,
    marginHorizontal: "10%",
    marginBottom: 10,
    fontWeight: "700",
    textAlign: "center"
  },
  holderContent: {
    width: "80%",
    color: "#687782",
    fontSize: 18,
    marginHorizontal: "10%",
    textAlign: "center"
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#00b2d6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
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
