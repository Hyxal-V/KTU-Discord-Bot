const { getData } = require("./modules/headless.js");
const storage = require('node-persist');
storage.init();
 getData().then(data =>{
    console.log(data);
 })
