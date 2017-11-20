// import this file for static assets
  let Obj = {
    boy1_png: require('./avatar/boy1.png'), boy2_png: require('./avatar/boy2.png'), boy3_png: require('./avatar/boy3.png'), boy4_png: require('./avatar/boy4.png'), boy5_png: require('./avatar/boy5.png'), boy6_png: require('./avatar/boy6.png'), boy7_png: require('./avatar/boy7.png'), boy8_png: require('./avatar/boy8.png'), girl1_png: require('./avatar/girl1.png'), girl2_png: require('./avatar/girl2.png'), girl3_png: require('./avatar/girl3.png'), girl4_png: require('./avatar/girl4.png'), girl5_png: require('./avatar/girl5.png'), girl6_png: require('./avatar/girl6.png'), girl7_png: require('./avatar/girl7.png'), girl8_png: require('./avatar/girl8.png'),
    search: function(key) {
      if(this.hasOwnProperty(key)) {
        return this[key];
      } else {
        return -1;
      }
    },
    format: function(extention) {
      let filteredArray = this.filter(assetSlug => (assetSlug.includes("-"+extention)));
      if(filteredArray.length){
        return filteredArray;
      } else {
        return -1;
      }
    }
  }
  export default Obj;
  