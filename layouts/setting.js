import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';

import API from '../api';
import TabBar from '../components/tabbar';

import Pack from '../components/settings/pack';
import Comment from '../components/settings/comment';
import Add from '../components/settings/add';
import User from '../components/settings/user';
import Seting from '../components/settings/setting';

export default class Setting extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: "pack"
    }
  }

  renderPage(page){
    if(page == "pack"){
      return (<Pack/>);
    }else if(page == "comment"){
      return (<Comment/>);
    }else if(page == "add"){
      return (<Add/>);
    }else if(page == "user"){
      return (<User/>);
    }else if(page == "setting"){
      return (<Seting/>);
    }
  }

  changeTab(newTab){
    this.setState({
      page: newTab
    });
  }

  render() {
    return (
      <View style={styles.carrier}>
        <ScrollView style={styles.carrierSV}>
          <TouchableOpacity onPress={() => API.event.emit("setting", false)}><Text>Close</Text></TouchableOpacity>
          {this.renderPage(this.state.page)}
        </ScrollView>
        <TabBar onTabChanged={this.changeTab.bind(this)}/>
      </View>
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
