// Differentiate between setup and layout components

import React from 'react';
import { Text, View, StatusBar } from 'react-native';

import Layout from './layouts/layout';
import Setup from './layouts/setup';

import { Font } from 'expo';

import API from './api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      setup: false,
      font: false
    }
  }

  componentWillMount(){
    API.getData("setup").then(setupStatus => {
      console.log(setupStatus);
      if(setupStatus == "start"){
        this.setState({setup: "start"});
      }else{
        this.setState({setup: "done"});
      }
    });
  }

  componentDidMount(){
    Font.loadAsync({
      'rubik': require('./fonts/Rubik-Regular.ttf'),
      'rubik-bold': require('./fonts/Rubik-Bold.ttf')
    }).then(() => {
      this.setState({font: true});
    });
    this.checkTimeout();
  }

  checkTimeout(){
    setTimeout(() => {
      if(!this.state.setup){
        API.getData("setup").then(setupStatus => {
          if(setupStatus == "start"){
            this.setState({setup: "start"});
          }else{
            this.setState({setup: "done"});
          }
        });
        this.checkTimeout();
      }
    }, 300);
  }

  setupFinished(){
    this.setState({setup: "done"});
    API.setData("setup", "done");
  }

  renderMainComponent(){
    if(this.state.setup == "start"){
      return(<Setup finished={this.setupFinished.bind(this)}/>);
    }else if(this.state.setup == "done"){
      return(<Layout language={this.state.currentLang}/>);
    }else{
      return null;
    }
  }

  render() {
    if(this.state.font){
      return (
        <View style={{flex: 1, position: "relative"}}>
          <StatusBar hidden={true}/>
          {this.renderMainComponent()}
        </View>
      );
    }else{
      return null;
    }
  }
}
