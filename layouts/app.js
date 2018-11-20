import React from 'react';
import { View, Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');

import API from '../api';
import CardArrayLanguage from '../js/language';

import Cards from './cards';
import Groups from './groups';
import Announcer from '../components/announcer';

export default class App extends React.Component {
  constructor(props){
    super(props);
    API.gridSize = [3, 5];
    this.state = {
      currentGroup: "general",
      gridSize: (height > width)?API.gridSize[0]:API.gridSize[1],
      localizedCardData: this.getLocalizedCardData(API.currentLang)
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        gridSize: (height > width)?API.gridSize[0]:API.gridSize[1]
      });
    });
  }

  componentWillUnmount(){
    Dimensions.removeEventListener("change", () => {});
  }

  getLocalizedCardData(lang){
    return CardArrayLanguage[lang.split("-")[0]];
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
      <View style={{flex: 1, flexDirection: "column"}}>
        <View style={{flex: 1, flexDirection: 'column', height: "100%"}}>
          <Cards
            group={this.state.currentGroup}
            gridSize={this.state.gridSize}
            localizedCardData={this.state.localizedCardData}/>
          <Groups
            changeGroup={this.onGroupChanged.bind(this)}
            gridSize={this.state.gridSize}
            localizedCardData={this.state.localizedCardData}/>
        </View>
        <Announcer/>
      </View>
    );
  }
}
