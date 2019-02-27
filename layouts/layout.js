import React from 'react';
import { View, Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');
import SwipeUpDown from '../components/swipeable-bottom';

import Search from './search';

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
      <View style={{flex: 1, flexDirection: "column", height: height}}>
        <View style={{flex: 1, flexDirection: 'column', height: height}}>
          <Cards
            group={this.state.currentGroup}
            gridSize={this.state.gridSize}
            localizedCardData={this.state.localizedCardData}/>
          <Groups
            changeGroup={this.onGroupChanged.bind(this)}
            gridSize={this.state.gridSize}
            localizedCardData={this.state.localizedCardData}/>
        </View>
        <SwipeUpDown
          item={<Search/>} // Pass props component when collapsed
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          onMoveDown={() => console.log('down')}
          onMoveUp={() => console.log('up')}
          animation={"spring"}
          swipeHeight={80}
          disablePressToShow={false} // Press item mini to show full
          style={{
            backgroundColor: '#fff', shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: {
                height: 0,
                width: 0
            },
            //android
            elevation: 1
          }} // style for swipe
          />
        <Announcer/>
      </View>
    );
  }
}
