import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import API from '../api';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import TouchableScale from './touchable-scale';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: null,
      tab: "pack"
    };
  }

  changeTab(toTab){
    this.setState({
      tab: toTab
    });
    this.props.onTabChanged(toTab);
  }

  getIconColor(iconSlug){
    if(iconSlug == this.state.tab){
      return "#222222";
    }else{
      return "#666666";
    }
  }

  render() {
    return(
      <View style={styles.tabbar}>
        <TouchableScale onPress={() => this.changeTab("pack")} style={styles.tabIcon}>
          <EvilIcons name="archive" size={38} color={this.getIconColor("pack")} />
        </TouchableScale>
        <TouchableScale onPress={() => this.changeTab("comment")} style={styles.tabIcon}>
          <EvilIcons name="comment" size={38} color={this.getIconColor("comment")} />
        </TouchableScale>
        <TouchableScale onPress={() => this.changeTab("add")} style={styles.tabIcon}>
          <EvilIcons name="plus" size={38} color={this.getIconColor("add")} />
        </TouchableScale>
        <TouchableScale onPress={() => this.changeTab("user")} style={styles.tabIcon}>
          <EvilIcons name="user" size={38} color={this.getIconColor("user")} />
        </TouchableScale>
        <TouchableScale onPress={() => this.changeTab("setting")} style={styles.tabIcon}>
          <EvilIcons name="gear" size={38} color={this.getIconColor("setting")} />
        </TouchableScale>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    height: 50,
    backgroundColor: "#fff",
    shadowOpacity: 0.75,
    shadowRadius: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { height: -2, width: 0 },
    zIndex: 99999,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tabIcon: {
    padding: 10,
  }
});
