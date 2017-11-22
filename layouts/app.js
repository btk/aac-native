import React from 'react';
import { View, Dimensions } from 'react-native';

import API from '../api';
import CardArrayLanguage from '../js/language';

import Cards from './cards';
import Groups from './groups';
import Announcer from '../components/announcer';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentGroup: "general",
      gridSize: this.getGridSizeRelativeToDimension(),
      localizedCardData: this.getLocalizedCardData(API.currentLang)
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        gridSize: this.getGridSizeRelativeToDimension()
      });
    });
  }

  componentWillUnmount(){
    Dimensions.removeEventListener("change", () => {});
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

  componentDidMount(){
    API.segment.screen("start");
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
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
