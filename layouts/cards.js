import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import Card from '../components/card';

import API from '../api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log("card data", this.props.localizedCardData);
    this.state = {
      group: this.props.group,
      cardData: this.props.localizedCardData.filter(c => c.parents.includes(this.props.group)),
      gridSize: this.props.gridSize,
      loading: true,
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.group != this.state.group){
      this.setState({
        group: newProps.group,
        cardData: newProps.localizedCardData.filter(c => c.parents.includes(newProps.group)),
        loading: true
      });
      API.segment.screenWithProperties(newProps.group, {grid: this.state.gridSize});
      setTimeout(() => {
        this.setState({loading: false});
      }, 1);
    }
    //&#10084;
    if(this.state.gridSize != newProps.gridSize){
      this.setState({
        gridSize: newProps.gridSize
      });
    }
  }

  componentDidMount(){
    this.setState({loading: false});
  }

  render() {
    let { height, width } = Dimensions.get('window');
    let gridSize = (height > width)?API.gridSize[0]:API.gridSize[1];

    return (
      <View style={styles.cardsCarrier}>
        { this.state.loading &&
          <View style={styles.loadingPanel}>
            <Text>Loading</Text>
          </View>
        }
        { !this.state.loading &&
          <ScrollView style={styles.cardsScrollView}>
            <View style={styles.cardsScrollViewInner}>
              {this.state.cardData.map((data, i) => (
                <Card data={data} key={i + data.slug}/>
              ))}
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardsCarrier: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  loadingPanel: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999999
  },
  cardsScrollView: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
  cardsScrollViewInner: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap"
  }
});
