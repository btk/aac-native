import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import Assets from '../js/assets';

var {height, width} = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.data = this.props.data;
  }

  render() {
    if(this.data){
      return (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => this.props.onPressFunc(this.data.slug)}>
            <View style={styles.cardInner}>
              <Image source={Assets[this.data.slug]} style={{width: "90%", height: "75%", resizeMode: 'contain'}}/>
              <Text style={styles.carText}>{this.data.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  card: {
    height: height / 100 * 30,
    width: width / 5,
    alignItems: "center",
    justifyContent: "center"
  },
  cardInner: {
    height: height / 100 * 26,
    width: width / 100 * 18,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center"
  },
  carText: {
    textAlign: "center",
    color: "#555"
  }
});
