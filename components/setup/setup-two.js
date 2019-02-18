import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient, Svg } from 'expo';
let { height, width } = Dimensions.get('window');

import API from '../../api';
import Avatar from '../../assets/avatar';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: null
    }
  }

  choose(avatar){
    this.setState({avatar});
    API.setData("avatar", avatar);
    API.segment.trackWithProperties("chooseAvatar", {avatar: avatar});
  }

  getStyle(avatar){
    if(this.state.avatar == avatar){
      return {backgroundColor: "#C7CFE2", borderRadius: 5, overflow: "hidden"};
    }else{
      return {};
    }
  }

  renderAvatars(){
    let returnArray = [];
    let genders = ["boy", "girl"];
    let identifiers = [1, 2, 3, 4, 5, 6, 7, 8];
    genders.forEach((gender) => {
      identifiers.forEach((identifier) => {
        let avatarHash = gender + identifier;
        returnArray.push(
          <TouchableOpacity key={avatarHash} onPress={() => this.choose(avatarHash)} style={this.getStyle(avatarHash)}>
            <Image source={Avatar[avatarHash+"_png"]} style={styles.avatarImage}/>
          </TouchableOpacity>
        );
      });
    });
    return returnArray;
  }

  getButton(){
    if(this.state.avatar){
      return (
        <TouchableOpacity onPress={() => this.props.button(this.state.avatar, 2)} style={styles.button}>
          <Text style={styles.buttonText}>{API.UIText("setupZeroButton")}</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={[styles.button, {backgroundColor: "#ddd"}]}>
          <Text style={styles.buttonText}>{API.UIText("setupTwoButton")}</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.holder}>
        <View>
          <Text style={styles.holderTitle}>{API.UIText("setupTwoHeading")}</Text>
          <Text style={styles.holderContent}>{API.UIText("setupTwoContent")}</Text>
        </View>
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>{this.renderAvatars()}</View>
        {this.getButton()}
        <Text style={styles.copy}>Dream Oriented Inc.</Text>
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
  },
  avatarImage: {
    width: width > height ? (width - 30 * 8) * 0.125 : width * 0.18,
    height: width > height ? (width - 30 * 8) * 0.125 : width * 0.18,
    marginHorizontal: width > height ? 15 : width * 0.035,
    marginVertical: width > height ? 15 : width * 0.015,
    alignSelf: "center"
  }
});
