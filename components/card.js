import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import API from "../api";
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

  async cardPressed(){
    if(this.props.onPressFunc){
      this.props.onPressFunc(this.data.slug);
    }else{
      if(this.props.size == "big"){
        this.data.phrases = this.data.phrases.filter(p => (p.phrase == this.data.title));
      }
      API.speak(this.data.title);
      API.event.emit("announce", this.data);
    }
  }

  render() {
    if(this.data){
      let { height, width } = Dimensions.get('window');
      let wideDimention = (height > width)?height:width;
      let gridSize = (height > width)?3:5;
      let cardFontSize = wideDimention * 0.022;

      let ordinaryStyle = { width: width / gridSize, height: width / (gridSize + 1) };
      let bigStyle = { width: "50%", height: "50%"};
      let xxlStyle = { width: "100%", height: "100%"};
      let innerStyle = {};
      let innerStyleText = { fontSize: cardFontSize };
      if(this.data.color){
        innerStyle = { backgroundColor: this.data.color, borderWidth: 0 };
        innerStyleText = { fontSize: cardFontSize, color: "#fff", fontWeight: "bold" };
      }
      return (
        <View style={(this.props.size == "big")?bigStyle:(this.props.size == "xxl")?xxlStyle:ordinaryStyle}>
          <TouchableOpacity style={styles.toStyle} onPress={this.cardPressed.bind(this)}>
            <View style={[styles.cardInner, innerStyle]}>
              <View style={styles.cardImageCarrier}>
                { !this.state.loading &&
                  <Image source={Assets[this.data.slug]} style={styles.cardImage}/>
                }
              </View>
              <View style={styles.cardTextCarrier}>
                <Text style={[styles.cardText, innerStyleText]}>{this.data.title}</Text>
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
    backgroundColor: "#fff",
    borderRadius: 5,
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
    color: "#555"
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
