import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
let { height, width } = Dimensions.get('window');
import Assets from '../js/assets';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    if(this.props.data){
      return (
        <View style={styles.speaking}>
          <Image source={Assets[this.props.data.slug]} style={styles.cardImage}/>
          <Text style={styles.cardText}>{this.props.data.title}</Text>
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  speaking: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  cardImage: {
    width: "70%",
    height: "70%",
    resizeMode: 'contain',
    padding: "5%"
  },
  cardText: {
    fontSize: 25,
    color: "#555"
  }
});
