const githubHelper = require("../helpers/githubHelper");
const PubSub = require("pubsub-js");
const User = require("../models/user");

module.exports = {

    getAll: async function (req, res) {
        const users = await User.find();
        res.send(users);
    },

    getByUserName: async function (req, res) {
        let username = req.params.username;
        const users = await User.find({ username: username }).limit(1).skip(0);
        if (users === null || users.length === 0) {
            PubSub.publish("searching.localDb", null);
            // inquiry to git api
            githubHelper.get(username).then(data => {
                let user = null;
                if (!data) {
                    PubSub.publish("searching.gitAPI", null);
                    res.status(404);
                } else {
                    // storing local
                    user = new User({
                        username: data.login,
                        url: data.url,
                        email: data.email,
                        name: data.name,
                        location: data.location,
                        rawData: data
                    });
                    user.save();
                }

                res.send(user);
            })
        } else {
            res.send(users[0]);
        }
    },

    deleteById: async function (req, res) {
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
    }
}

