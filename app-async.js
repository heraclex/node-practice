const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');
const countryEE = new EventEmitter();

console.log("app start");

countryEE.on('country-data', function(data){
  // consume data from file reader
  console.log(data);
});

fs.readFile("companies.json", function (error, data) {
  if (error) { throw error; }
  var lines = data.toString().split("\n")

  var index = 1;
  var publishCountryInterval = setInterval(function(){
    if(index < lines.length-2){
      countryEE.emit('country-data', lines[index]);
    }else{
      console.log("...end");
      clearInterval(publishCountryInterval);
      console.log("app stop");
    }

    index++;
  }, 1000);
  
});

console.log("...waiting for response!");