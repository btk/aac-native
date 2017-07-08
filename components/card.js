import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardInner}>
          <Text>Card</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: height / 100 * 30,
    width: width / 5,
    alignItems: "center",
    justifyContent: "center"
  },
  cardInner: {
    height: height / 100 * 26,
    width: width / 100 * 18,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center"
  }
});
