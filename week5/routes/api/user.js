const router = require("express").Router();
const githubHelper = require("../../helpers/githubHelper");
const dataHelper = require("../../helpers/dataHelper");

router.get("/users/:username", async (req, res) => {
  let username = req.params.username;
  console.log(`Received request with username: ${username}`);

  let user = await dataHelper.getUser(username);
  if (user === null) {
    // inquiry to git api
    githubHelper.get(username).then(user => {
      // storing local
      dataHelper.insert(user);
      //return back to client
      console.log("return new-user from Git-api to client");
      res.send(user);
    });
  } else {
    res.send(user);
  }
});

// only available if local data is available
router.post("/users/:username", async (req, res) => {
  let username = req.params.username;
  let userdata = req.body.userdata;
  console.log(req.body);

  console.log(`Received request with username: ${username}`);

  let user = await dataHelper.getUser(username);
  if (user === null) {
    res.status(500).jsonp({ error: "user not found" });
  } else {
    dataHelper.update(username, userdata).then(
      isSuccess => {
        if (isSuccess)
          res.status(200).jsonp({ mess: `user: ${username} has been updated` });
      },
      err => {
        res.status(500).jsonp({ error: err });
      }
    );
  }
});

router.get("/users", (req, res) => {
  dataHelper.getAllUsers().then(users => {
    res.send(users);
  });
});

module.exports = router;
