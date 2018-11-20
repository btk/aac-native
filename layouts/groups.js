import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';

import Card from '../components/card';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.groupCards = this.getGroupCards(props.localizedCardData);
    let { height, width } = Dimensions.get('window');

    this.state = {
      gridSize: this.props.gridSize,
      size: (height > width)?"normal":"small",
      categoryHeight: (height > width)?width / (this.props.gridSize + 1) + 14:width / 2 / (this.props.gridSize + 1) + 14
    };
  }

  componentWillMount(){
    Dimensions.addEventListener("change", () => {
      let { height, width } = Dimensions.get('window');
      let gridSize = this.state.gridSize;
      this.setState({
        size: (height > width)?"normal":"small",
        categoryHeight: (height > width)?width / (gridSize + 1) + 14:height / 2 / (gridSize + 1) + 14
      });
    });
  }

  componentWillReceiveProps(newProps){
    this.setState({
      gridSize: newProps.gridSize
    });
  }

  getGroupCards(cardData){
    return cardData.filter(c => c.type === 'group');
  }

  changeGroup(toSlugString){
    this.props.changeGroup(toSlugString);
  }

  render() {
    return (
      <View style={[styles.groupCarrier, {height: this.state.categoryHeight}]}>
        <ScrollView style={styles.groupScrollView} horizontal={true}>
          {
            this.groupCards.map((card, i) => (
              <Card data={card} size={this.state.size} key={i} onPressFunc={this.changeGroup.bind(this)}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupCarrier: {
    backgroundColor: "#fff",
    marginVertical: 7,
    shadowOpacity: 0.75,
    shadowRadius: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { height: -2, width: 0 },
    zIndex: 9999
  },
  groupScrollView: {
    flex: 1
  }
});
