import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Card from '../components/card';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.cardsCarrier}>
        <ScrollView style={styles.cardsScrollView}>
          <View style={styles.cardsScrollViewInner}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
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
