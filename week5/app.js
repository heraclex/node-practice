const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser());

//app.use(require("./routes/index"));

app.listen(3000, () => {
  console.log("app start");
});

app.use(express.static(path.join(__dirname, "css")));

//assuming app is express Object.
app.get("/", function(req, res) {
  // start send file
  console.log("start send file");
  res.sendFile(path.join(__dirname + "/index.html"));
});

/*const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "nodejsCourse";

mongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, client) {
    if (err) console.log(err);
    const db = client.db(dbName);
    console.log("Connected Successfull");

    //const collection =
  }
);

function connection(db, name, callback) {
  const collection = db.createCollection(name, function(err, results) {
    callback(results);
  });
}*/
