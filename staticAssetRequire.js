var fs = require("fs");


fs.readdir("./data/images/", function(err, items) {
  let slugArray = [];

  items.forEach((file) => {
    if(file.includes(".png")){
      slugArray.push(`${file.split('.')[0]}: require('../data/images/${file}')`);
    }
  });


  let assetsFileContent = `// import this file for static images
  let Obj = {
    ${slugArray.join(', ')}
  }
  export default Obj;
  `;

  fs.writeFile ("./js/assets.js", assetsFileContent, function(err) {
      if (err) throw err;
      console.log('Static images required');
  });

});
