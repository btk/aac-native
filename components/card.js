import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Event from "../js/event";

import Assets from '../js/assets';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.data = this.props.data;
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ loading: false });
    }, 100);
  }

  cardPressed(){
    if(this.props.onPressFunc){
      this.props.onPressFunc(this.data.slug);
    }else{
      Event.emit("announce", this.data);
    }
  }

  render() {
    if(this.data){
      let { height, width } = Dimensions.get('window');
      let gridSize = (height > width)?3:5;

      return (
        <View style={styles.card} style={{width: width / gridSize, height: width / (gridSize + 1.5)}}>
          <TouchableOpacity style={styles.toStyle} onPress={this.cardPressed.bind(this)}>
            <View style={styles.cardInner}>
              <View style={styles.cardImageCarrier}>
                { !this.state.loading &&
                  <Image source={Assets[this.data.slug]} style={styles.cardImage}/>
                }
              </View>
              <View style={styles.cardTextCarrier}>
                <Text style={styles.cardText}>{this.data.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  card: {},
  toStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cardInner: {
    height: "95%",
    width: "95%",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextCarrier: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    textAlign: "center",
    color: "#555",
  },
  cardImageCarrier: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "90%",
    height: "90%",
    resizeMode: 'contain'
  }
});
