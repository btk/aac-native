import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Cards from './cards';
import Groups from './groups';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.carrier}>
        <Cards />
        <Groups />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carrier: {
    flex: 1,
    flexDirection: 'row'
  },
});
