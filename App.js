import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Layout from './layouts/app';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.generalContainer}>
        <StatusBar hidden={true}/>
        <Layout language={"en"}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1
  },
});
