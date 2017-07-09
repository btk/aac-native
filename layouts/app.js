import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Cards from './cards';
import Groups from './groups';

export default class App extends React.Component {
  state = {
    currentGroup: "general"
  };

  onGroupChanged(newGroupString){
    console.log(newGroupString);
    this.setState({currentGroup: newGroupString});
  }

  render() {
    return (
      <View style={styles.carrier}>
        <Cards group={this.state.currentGroup}/>
        <Groups changeGroup={this.onGroupChanged.bind(this)}/>
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
