import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Card from '../components/card';

import CardData from '../data/card.json';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cardData: CardData.filter(c => c.parents.includes(this.props.group))
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      cardData: CardData.filter(c => c.parents.includes(newProps.group))
    });
  }

  render() {
    return (
      <View style={styles.cardsCarrier}>
        <ScrollView style={styles.cardsScrollView}>
          <View style={styles.cardsScrollViewInner}>
            {this.state.cardData.map((data, i) => (
              <Card data={data} key={i + data.slug}/>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardsCarrier: {
    height: "100%",
    width: "80%",
    backgroundColor: "#fff"
  },
  cardsScrollView: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  cardsScrollViewInner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap"
  }
});
