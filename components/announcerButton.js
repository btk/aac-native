import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

let { height, width } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';

let anchor = (height > width)?width:height;

const iconMap = {
  back: "arrow-back",
  repeat: "autorenew"
}

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressFunc} style={styles.buttonCarrier}>
        <MaterialIcons name={iconMap[this.props.type]} size={anchor * 0.13} color="rgba(98, 152, 218,1)"/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonCarrier: {
    borderRadius: anchor * 0.1,
    width: anchor * 0.2,
    height: anchor * 0.2,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center", shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
        height: 0,
        width: 0
    },
    //android
    elevation: 1
  }
});
