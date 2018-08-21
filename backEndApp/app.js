
// configuration should be always put on top of entrance file *.js
// in order to load the configuration
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PubSub = require("pubsub-js");
const bodyParser = require("body-parser");
const compression = require('compression');
require('./src/config/mongoose');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

/* route-api configuration */
app.use(require("./src/routes/index"));
app.use("/public", express.static(__dirname + '/public'));


io.on("connection", function (client) {
  console.log("a user connected");
  client.on("disconnect", function () {
    console.log("user disconnected");
  });

  client.on("join", function (data) {
    console.log(data);
    client.emit("messages", "Hello from server");
  });

  PubSub.subscribe("searching.localDb", searchingLocalDb_Subscriber);
  PubSub.subscribe("searching.gitAPI", searchingGitApi_Subscriber);

  function searchingLocalDb_Subscriber(msg, data) {
    if (data == null) {
      client.emit(
        "messages",
        "No data found on local db. Start looking at Git API"
      );
    }
  }

  function searchingGitApi_Subscriber(msg, data) {
    if (data == null) {
      client.emit(
        "messages",
        "No data found on local db. Start looking at Git API"
      );
    }
  }
});

// Start Server app which wrapped the express app inside
server.listen(3000, () => {
  console.log("server start, listening on *:3000");
});
