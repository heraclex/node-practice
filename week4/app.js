const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser());

app.use(require("./routes/index"));

app.listen(3000, () => {
  console.log("hi there");
});
