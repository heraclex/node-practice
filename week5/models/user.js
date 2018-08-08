const mongoose = require("mongoose");

const User = mongoose.model("user", {
  username: {
    type: String,
    required: true
  },
  url: String,
  email: String,
  name: String,
  location: String,
  rawData: Object
});

module.exports = User;
