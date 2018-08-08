const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PubSub = require("pubsub-js");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Setup db connection
mongoose.connect("mongodb://localhost/nodejs_course");
mongoose.Promise = Promise;

app.use(bodyParser());
app.use(require("./routes/index"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/scripts"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(client) {
  console.log("a user connected");
  client.on("disconnect", function() {
    console.log("user disconnected");
  });

  client.on("join", function(data) {
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
