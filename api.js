import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import { Segment, Util } from 'expo';
Segment.initialize({androidWriteKey: "298WYn6hOXv4BddjlNOZRagGaGclM9lk", iosWriteKey: "oE7PqdqThY76XZ12iwRHzJTYEh5KtC3s"});

import UIText from './data/text.json';

import makeid from './js/makeid';
import Event from './js/event';

const NETWORK_STATUS = true;
const _FLUSH = false;
const _DEVLANG = false;

let storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true,
	sync: {}
});


class Api {
  constructor(){
    this.segment = Segment;
		this.event = Event;
    console.log("API: Created instance");
    this.currentLang = _DEVLANG;
    this.initApiCurrents();
    if(_FLUSH){
			this.flush();
		}
  }

	flush(){
		// Flush to the begining state
		this.setData("lang", "");
		console.log("API: flushed");
	}

  initApiCurrents(){
    this.getData("userId").then(uid => {
        this.segment.identify(uid);
        console.log("Segment: User identified" + uid);
    }, err => {
      if(err.name == "NotFoundError"){
        let uid = makeid(8);
        this.setData("userId", uid);
        this.segment.identify(uid);
        console.log("API: First time userId set");
				console.log("Segment: User identified" + uid);
      }
    });

    this.getData("lang").then(lang => {
        console.log("API: serve with lang: ", lang);
				if(lang.includes("tr")){
					this.currentLang = "tr";
				}else if(lang.includes("de")){
					this.currentLang = "de";
				}else if(lang.includes("fr")){
					this.currentLang = "fr";
				}else{
					this.currentLang = "en";
				}
				if(_DEVLANG){ this.currentLang = _DEVLANG; }
    }, err => {
      if(err.name == "NotFoundError"){
        Util.getCurrentLocaleAsync().then(lang => {
          this.setData("lang", lang);
          console.log("API: first time lang init", lang);
					if(lang.includes("tr")){
						this.currentLang = "tr";
					}else if(lang.includes("de")){
						this.currentLang = "de";
					}else if(lang.includes("fr")){
						this.currentLang = "fr";
					}else{
						this.currentLang = "en";
					}
					if(_DEVLANG){ this.currentLang = _DEVLANG; }
        });
      }
    });
  }

  UIText(identifier, forcedLang){
		if(UIText[identifier]){
			if(forcedLang){
				return UIText[identifier][forcedLang];
			}else if(UIText[identifier][this.currentLang]){
				return UIText[identifier][this.currentLang];
			}else{
				return UIText[identifier].en;
			}
		}else{
			return "UndefinedUIText";
		}
  }

	changeLang(toLang){
		this.setData("lang", toLang);
		this.currentLang = toLang;
	}

  // These are like kinda private;
  // But fuck it, use them in the general app, who cares.
  setData(key, data){
    return storage.save({key, data});
  }

  getData(key){
    // returns promise
    return storage.load({key});
  }
}

const _api = new Api();
export default _api;
