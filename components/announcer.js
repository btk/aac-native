import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
let { height, width } = Dimensions.get('window');
import Event from "../js/event";

import Child from './child';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      animation: new Animated.Value(0),
      orientation: this.getOrientation()
    }
    Event.addListener("announce", (data) => {
      this.setState({data});
      this.animateAnnouncer(1);
    });

    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: this.getOrientation()
      });
    });
  }

  getOrientation(){
    let { height, width } = Dimensions.get('window');
    return (height > width)?"portrait":"landscape";
  }

  animateAnnouncer(toVal){
    Animated.spring(
      this.state.animation,
      {
        toValue: toVal,
        duration: 300,
        friction: 4,
        useNativeDriver: true
      },
    ).start();
  }

  render() {
    const animationStyle = {
      transform: [{
        translateY: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        })
      }]
    };

    let portraitStyle = {};
    if(this.state.orientation == "portrait"){
      portraitStyle = {
        inner: { flexDirection: "column-reverse" },
        childCarrier: { width: "100%", height: "30%"},
        speechCarrier: { width: "100%", height: "70%"}
      };
    }

    if(this.state.data){
      return (
        <Animated.View style={[styles.announcer, {opacity: this.state.animation}]}>
          <Animated.View style={[styles.announcerInner, animationStyle, portraitStyle.inner]}>
            <View style={[styles.childCarrier, portraitStyle.childCarrier]}>
              <Child width={((width<height)?width:height) * 0.5}
                     height={((width<height)?width:height) * 0.5}
                     tan="#FFE1B2"
                     hair="#734A3E"
                     eye="#623F33"
                     shirt="#a94f4f"
                     />
            </View>
            <View style={[styles.speechCarrier, portraitStyle.speechCarrier]}>
              <View style={styles.speechInner}>
                <Text>{`I want to eat ${this.state.data.title}`}</Text>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
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
    backgroundColor: "rgba(108,189,200,0.5)",
  },
  announcerInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  childCarrier: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center"
  },
  speechCarrier: {
    height: "100%",
    width: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  speechInner: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    width: "90%",
    height: "90%",
    backgroundColor: "#fff"
  }
});
