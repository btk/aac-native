import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Card from '../components/card';
import CardData from '../data/card.json';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.groupCards = this.getGroupCards(CardData);
  }

  getGroupCards(cardData){
    return cardData.filter(c => c.type === 'group');
  }

  changeGroup(toSlugString){
    this.props.changeGroup(toSlugString);
  }

  render() {
    return (
      <View style={styles.groupCarrier}>
        <ScrollView style={styles.groupScrollView}>
          {
            this.groupCards.map((card, i) => (
              <Card data={card} key={i} onPressFunc={this.changeGroup.bind(this)}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupCarrier: {
    height: "100%",
    width: "20%",
    backgroundColor: "#fafafa",
    borderLeftWidth: 1,
    borderLeftColor: "#f1f1f1"
  },
  groupScrollView: {
    flex: 1
  }
});
