const fs = require('fs')
const dataProcessor = require('./data-processor')
const EventEmitter = require('events')

class countryEmitter extends EventEmitter {
  run(fileName) {
    console.log("app start");
    
    // read file async
    fs.readFile(fileName, dataProcessor.asyncExecution.bind(this));

    console.log("...waiting for response!");
  }

}

module.exports = new countryEmitter();