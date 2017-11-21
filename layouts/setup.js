import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient, Svg } from 'expo';

import API from '../api';

import SetupZero from '../components/setup-zero';
import SetupOne from '../components/setup-one';
import SetupTwo from '../components/setup-two';
import SetupThree from '../components/setup-three';
import SetupFour from '../components/setup-four';
import SetupFive from '../components/setup-five';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(1),
      step: 0
    }
  }

  componentDidMount(){
    this.animate(0);
  }

  buttonPress(data, component){
    console.log("Button Data: ", data);
    this.animate(1);
    if(data == "finish"){
      this.props.finished();
    }else{
      setTimeout(() => {
        this.setState({step: component + 1});
      }, 400);
      setTimeout(() => {
        this.animate(0);
      }, 600);
    }
  }

  animate(toVal){
    Animated.spring(
      this.state.animation,
      {
        toValue: toVal,
        friction: 100
      },
    ).start();
  }

  getStep(step){
    if(step == 0){
      return (<SetupZero button={this.buttonPress.bind(this)}/>);
    }else if(step == 1){
      return (<SetupOne button={this.buttonPress.bind(this)}/>);
    }else if(step == 2){
      return (<SetupTwo button={this.buttonPress.bind(this)}/>);
    }else if(step == 3){
      return (<SetupThree button={this.buttonPress.bind(this)}/>);
    }else if(step == 4){
      return (<SetupFour button={this.buttonPress.bind(this)}/>);
    }else if(step == 5){
      return (<SetupFive button={this.buttonPress.bind(this)}/>);
    }
  }

  render() {
    const animationStyle = {height: this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["100%", "200%"],
      }),
    opacity: this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })};

    return (
      <View style={styles.carrier}>
        <Animated.View style={animationStyle}>
          {this.getStep(this.state.step)}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carrier: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%"
  }
});
