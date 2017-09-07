import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Layout from './layouts/app';
import Settings from './js/settings';

const LANGUAGE_FLUSH = false;
// LANGUAGE_FLUSH is a constant variable for development tests
// It flushes the localstorage saved language and locale data
// if any exists

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentLang: ""
    }

    if(LANGUAGE_FLUSH && !(this.state.currentLang)){
      Settings.setOption("language", "").then((flushed) => {
        console.log("Timeout start");
        setTimeout(() => {
          console.log("Timeout end");
          this.setLanguageAsState();
        }, 5000);
      });
    }else{
      this.setLanguageAsState();
    }

  }

  setLanguageAsState(){
    Settings.getOption("language").then(lang => {
      console.log("App is loading in language: ", lang);
      this.setState({currentLang: lang});
    });
  }

  render() {
    if(this.state.currentLang){
      return (
        <View style={styles.generalContainer}>
          <StatusBar hidden={true}/>
          <Layout language={this.state.currentLang}/>
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1
  },
});
