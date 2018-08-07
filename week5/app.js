const mongoClient = require("mongodb").MongoClient;
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
}
