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
      layout: (height > width)?"portrait":"landscape",
      localizedCardData: this.getLocalizedCardData(API.currentLang)
    };
    Dimensions.addEventListener("change", () => {
      let { height, width } = Dimensions.get('window');
      this.setState({
        layout: (height > width)?"portrait":"landscape"
      });
      console.log(this.state.layout);
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
      <View style={{flex: 1}}>
        <Groups
          changeGroup={this.onGroupChanged.bind(this)}
          layout={this.state.layout}
          localizedCardData={this.state.localizedCardData}/>
        <Cards
          group={this.state.currentGroup}
          layout={this.state.layout}
          localizedCardData={this.state.localizedCardData}/>
        <SwipeUpDown
          item={<Search/>} // Pass props component when collapsed
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          onMoveDown={() => console.log('down')}
          onMoveUp={() => console.log('up')}
          animation={"spring"}
          swipeHeight={80}
          layout={this.state.layout}
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
