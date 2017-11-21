// Differentiate between setup and layout components

import React from 'react';
import { Text, View, StatusBar } from 'react-native';

import Layout from './layouts/app';
import Setup from './layouts/setup';

import API from './api';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      setup: true
    }
  }

  renderMainComponent(){
    if(this.state.setup){
      return(<Setup finished={() => { this.setState({setup: false}); }}/>);
    }else{
      return(<Layout language={this.state.currentLang}/>);
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
