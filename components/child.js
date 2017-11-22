import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import API from '../api';
import Avatar from '../assets/avatar';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: null
    };
  }

  componentWillMount(){
    API.getData("avatar").then(avatar => { this.setState({avatar})});
  }

  render() {
    return(
      <View style={styles.child}>
        <Image source={Avatar[this.state.avatar+"_png"]}
               style={{height: this.props.height, width: this.props.width}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  child: {
  }
});
