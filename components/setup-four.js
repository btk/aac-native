import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { LinearGradient, Svg, Speech } from 'expo';

import API from '../api';
import Avatar from '../assets/avatar';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pitch: 1,
      rate: 1
    }
    API.getData("avatar").then(avatar => { this.setState({avatar}); });
  }

  componentDidMount(){
    this.speak(this.state);
  }

  speak(setting){
    let speechCode = API.currentLang;
    console.log("Talking in the speech code: ", speechCode);

    if(setting.pitch){ this.setState({pitch: setting.pitch}); }
    if(setting.rate){ this.setState({rate: setting.rate}); }
    setTimeout(() => {
      Speech.speak(API.UIText("demoSpeechText"), {language: speechCode, pitch: this.state.pitch, rate: this.state.rate});
    }, 100);
  }

  getPitchStyle(pitch){
    if(this.state.pitch == pitch){
      return {margin: 5, backgroundColor: "#C7CFE2", borderRadius: 5, overflow: "hidden"};
    }else{
      return {margin: 5 };
    }
  }

  getRateStyle(rate){
    if(this.state.rate == rate){
      return {margin: 5, backgroundColor: "#C7CFE2", borderRadius: 5, overflow: "hidden"};
    }else{
      return {margin: 5 };
    }
  }

  render() {
    return (
      <View
        style={styles.holder}>
        <Image source={require("../assets/sound.png")} style={{width: 150, height: 100, alignSelf: "center", resizeMode: "contain", margin: "10%"}}/>
        <View>
          <Text style={styles.holderTitle}>{API.UIText("setupFourHeading")}</Text>
          <Text style={styles.holderContent}>{API.UIText("setupFourContent")}</Text>
          <View style={{flexDirection: "row", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => this.speak({pitch: 0.7})} style={this.getPitchStyle(0.7)}>
              <Image source={require("../assets/sound/pitch1.png")} style={styles.soundImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.speak({pitch: 1.0})} style={this.getPitchStyle(1.0)}>
              <Image source={require("../assets/sound/pitch2.png")} style={styles.soundImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.speak({pitch: 1.3})} style={this.getPitchStyle(1.3)}>
              <Image source={require("../assets/sound/pitch3.png")} style={styles.soundImage}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => this.speak({rate: 0.7})} style={this.getRateStyle(0.7)}>
              <Image source={require("../assets/sound/rate1.png")} style={styles.soundImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.speak({rate: 1.0})} style={this.getRateStyle(1.0)}>
              <Image source={require("../assets/sound/rate2.png")} style={styles.soundImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.speak({rate: 1.3})} style={this.getRateStyle(1.3)}>
              <Image source={require("../assets/sound/rate3.png")} style={styles.soundImage}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => { this.props.button(true, 4); }} style={styles.button}>
          <Text style={styles.buttonText}>{API.UIText("setupZeroButton")}</Text>
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
  input: {
    width: "80%",
    height: 40,
    fontSize: 18,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    textAlign: "center",
    borderColor: "#eee",
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
  },
  soundImage: {
    width: 50,
    height: 50,
    margin: 10
  }
});
