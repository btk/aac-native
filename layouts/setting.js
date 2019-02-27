import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import SwipeUpDown from '../components/swipeable-bottom';

import API from '../api';
import Search from './search';


export default class Setting extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <SwipeUpDown
        item={<Search/>} // Pass props component when collapsed
        onShowMini={() => console.log('mini')}
        onShowFull={() => console.log('full')}
        onMoveDown={() => console.log('down')}
        onMoveUp={() => console.log('up')}
        animation={"spring"}
        swipeHeight={100}
        disablePressToShow={false} // Press item mini to show full
        style={{
          backgroundColor: '#fff', shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
              height: 0,
              width: 0
          },
          //android
          elevation: 1
        }} // style for swipe
        />
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
