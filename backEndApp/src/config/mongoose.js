'use strict';

const mongoose = require('mongoose');
const path = require('path');
const modelsPath = path.resolve('src', 'models');
const fs = require('fs');
console.log(process.env.MONGO_DB_URI)
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true }).then(
  (res) => {
    console.log("Connected to Database Successfully.");
  }
).catch((e) => {
  console.log("Connection to Database Failed: ", e);
});

fs.readdirSync(modelsPath).forEach(function (file) {
  require(path.join(path.join(modelsPath, file)));
})