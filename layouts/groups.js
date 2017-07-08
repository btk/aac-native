import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Card from '../components/card';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.groupCarrier}>
        <ScrollView style={styles.groupScrollView}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
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
