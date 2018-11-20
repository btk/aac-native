// Differentiate between setup and layout components

import React from 'react';
import { Text, View, StatusBar } from 'react-native';

import Layout from './layouts/app';
import Setup from './layouts/setup';
import Setting from './layouts/setting';

import API from './api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      setup: false,
      setting: false
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
    API.event.addListener("setting", (setting) => {
      this.setState({setting});
      //this.setState({setup: "start"});
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
      if(this.state.setting){
        return(<Setting/>);
      }else{
        return(<Layout language={this.state.currentLang}/>);
      }
    }else{
      return null;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>
        {this.renderMainComponent()}
      </View>
    );
  }
}
