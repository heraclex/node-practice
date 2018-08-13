const router = require("express").Router();

const githubHelper = require("../../helpers/githubHelper");
const PubSub = require("pubsub-js");
const User = require("../../models/user");

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/users/:username", async (req, res) => {
  console.log(`Received 'GET' request with username: ${req.params.username}`);
  let username = req.params.username;

  const users = await User.find({ username: username })
    .limit(1)
    .skip(0);
  if (users === null || users.length === 0) {
    PubSub.publish("searching.localDb", null);
    // inquiry to git api
    githubHelper.get(username).then(data => {
      if (!data) {
        PubSub.publish("searching.gitAPI", null);
        res.send(null);
      } else {
        // storing local
        const user = new User({
          username: data.login,
          url: data.url,
          email: data.email,
          name: data.name,
          location: data.location,
          rawData: data
        });

        res.send(user);
      }
    })
  } else {
    res.send(users[0]);
  }
});

// only available if local data is available
router.post("/users/:username", async (req, res) => {
  //throw new Exception("Not implemented");
  // let username = req.params.username;
  // let userdata = req.body.userdata;

  // console.log(`Received request with username: ${username}`);

  // let user = await dataHelper.getUser(username);
  // if (user === null) {
  //   res.status(500).jsonp({ error: "user not found" });
  // } else {
  //   dataHelper.update(username, userdata).then(
  //     isSuccess => {
  //       if (isSuccess)
  //         res.status(200).jsonp({ mess: `user: ${username} has been updated` });
  //     },
  //     err => {
  //       res.status(500).jsonp({ error: err });
  //     }
  //   );
  // }
});

router.delete('/users/:id', async (req, res) => {
  console.log(`Received 'DELETE' request with userId: ${req.params.id}`);
  let userId = req.params.id;

  const users = await User.find({ _id: userId })
    .limit(1)
    .skip(0);

  if (users === null || users.length === 0) {
    res.status(400);
    res.send("User Not Found!!!")
  } else {
    const results = await User.remove({ _id: userId });
    res.send(results);
  }
});

module.exports = router;
