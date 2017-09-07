import React, { AsyncStorage } from 'react-native';
import Expo from 'expo';

async function getLocale() {
  // en-US
  // english-United-states
  return await Expo.Util.getCurrentLocaleAsync();
}

class Settings {
     async getOption(optionId){
      const value = await AsyncStorage.getItem(optionId);
      if (value !== null){
        return value;
      }else{
        return null;
      }
    }
    async setOption(optionId, optionData){
      try {
        await AsyncStorage.setItem(optionId, optionData);
      } catch (error) {
        console.log(error);
      }
    }
}


/* Set language if it is not already set */
let SettingObj = new Settings();

SettingObj.getOption("language").then(lang => {
  if(!lang){
    console.log("no lang has set before, setting it now.");
    getLocale().then(locale => {
      if(!locale) locale = "en-US";
      if(locale.includes("_")) {
        locale = locale.replace("_", "-");
      }
      let localeSplit = locale.split("-");
      let language = localeSplit[0] || "en";
      let country = localeSplit[1] || "US";

      SettingObj.setOption("language", language);
      SettingObj.setOption("country", country);
      console.log("set the language relative to phone lang", language);
    });
  }
});


export default SettingObj;
