import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';

let { height, width } = Dimensions.get('window');

import Event from "../js/event";
import API from "../api";

import Child from './child';
import AnnouncerButton from './announcerButton';
import Speaking from './speaking';
import Card from './card';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      animation: new Animated.Value(0),
      orientation: this.getOrientation()
    }

    API.event.addListener("announce", (data) => {
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

  back(){
    this.animateAnnouncer(0);
    setTimeout(() => {
      this.setState({data: null});
    }, 300);
  }

  setting(){
    this.animateAnnouncer(0);
    setTimeout(() => {
      API.event.emit("setting", true);
    }, 100);
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

  renderInnerSpeech(data){
    if(!data.phrases){
      data.phrases = [];
    }
    if(data.phrases.length > 1){
      let altArray = [];
      let altData = JSON.parse(JSON.stringify(data));
      data.phrases.forEach((p, i) => {
        altData.title = p.phrase;
        altArray.push(<Card data={JSON.parse(JSON.stringify(altData))} key={i + altData.title + "big"} size="big"/>);
      });
      return (
        <View style={styles.speechInner}>
          <Text style={styles.speechInnerText}>Choose One!</Text>
          <View style={styles.speechInnerInner}>
            {altArray}
          </View>
        </View>
      );
    } else {
      let altData = JSON.parse(JSON.stringify(data));
      if(altData.phrases[0]){
        altData.title = altData.phrases[0].phrase;
      }
      return (
        <View style={styles.speechInner}>
          <Speaking data={altData} key={altData.slug}/>
        </View>
      )
    }
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
        childCarrier: { width: "100%", height: "30%", flexDirection: "row"},
        speechCarrier: { width: "100%", height: "70%"}
      };
    }

    if(this.state.data){
      return (
        <Animated.View style={[styles.announcer, {opacity: this.state.animation}]}>
          <Animated.View style={[styles.announcerInner, animationStyle, portraitStyle.inner]}>
            <View style={[styles.childCarrier, portraitStyle.childCarrier]}>
              <AnnouncerButton type="back" onPressFunc={this.back.bind(this)}/>
              <Child width={((width < height)?width:height) * 0.4} height={((width < height)?width:height) * 0.4}/>
              <AnnouncerButton type="settings" onPressFunc={this.setting.bind(this)}/>
            </View>
            <View style={[styles.speechCarrier, portraitStyle.speechCarrier]}>
              {this.renderInnerSpeech(this.state.data)}
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
    backgroundColor: "rgba(108,189,200,0.75)",
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  speechCarrier: {
    height: "100%",
    width: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  speechInner: {
    borderRadius: 10,
    width: "90%",
    height: "90%",
    backgroundColor: "#fafafa"
  },
  speechInnerText: {
    margin:10,
    textAlign: "center",
    fontSize: 25,
    color: "#666"
  },
  speechInnerInner: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});
