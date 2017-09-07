import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

import Cards from './cards';
import Groups from './groups';
import Announcer from '../components/announcer';
import CardArrayLanguage from '../js/language';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentGroup: "general",
      gridSize: this.getGridSizeRelativeToDimension(),
      localizedCardData: this.getLocalizedCardData(props.language)
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        gridSize: this.getGridSizeRelativeToDimension()
      });
    });
  }

  componentWillReceiveProps(newProp){
    this.setState({
      localizedCardData: this.getLocalizedCardData(newProp.language)
    });
  }

  getLocalizedCardData(lang){
    return CardArrayLanguage[lang];
  }

  getGridSizeRelativeToDimension(){
    let { height, width } = Dimensions.get('window');
    return (height > width)?3:5;
  }

  onGroupChanged(newGroupString){
    console.log(newGroupString);
    this.setState({currentGroup: newGroupString});
  }

  render() {
    return (
      <View style={styles.carrier}>
        <Cards
          group={this.state.currentGroup}
          gridSize={this.state.gridSize}
          localizedCardData={this.state.localizedCardData}/>
        <Groups
          changeGroup={this.onGroupChanged.bind(this)}
          gridSize={this.state.gridSize}
          localizedCardData={this.state.localizedCardData}/>
        <Announcer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carrier: {
    flex: 1,
    flexDirection: 'row'
  }
});
