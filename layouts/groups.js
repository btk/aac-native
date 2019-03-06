import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';

import Card from '../components/card';
import API from '../api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.groupCards = this.getGroupCards(props.localizedCardData);
  }

  getGroupCards(cardData){
    return cardData.filter(c => c.type === 'group');
  }

  changeGroup(toSlugString){
    this.props.changeGroup(toSlugString);
  }

  render() {
    return (
      <View style={[styles.groupCarrier, {height: (this.props.layout == "portrait") ? 110 : 70}]}>
        <ScrollView style={{flex: 1}} horizontal={true}>
          {
            this.groupCards.map((card, i) => (
              <Card data={card} key={i} size={this.props.layout == "portrait" ? "normal":"small"} onPressFunc={this.changeGroup.bind(this)}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupCarrier: {
    backgroundColor: "#fafafa",
    paddingVertical: 0,
    position: "absolute",
    bottom: 76,
    paddingTop: 4,
    paddingBottom: 5,
    left: 0,
    zIndex: 1, shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
        height: 0,
        width: 0
    },
    //android
    elevation: 1
  }
});
