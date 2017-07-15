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
          <Text>{this.props.data.title}</Text>
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  speaking: {
    flex: 1
  },
  cardImage: {
    width: "50%",
    height: "50%",
    resizeMode: 'contain'
  }
});
