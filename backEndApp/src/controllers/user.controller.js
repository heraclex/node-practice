const httpStatus = require('http-status-codes');
const githubHelper = require("../helpers/githubHelper");
const PubSub = require("pubsub-js");
const User = require("../models/user");
const fs = require('fs');

module.exports = {

    getAll: async (req, res) => {
        const users = await User.find();
        res.send(users);
    },

    getByUserName: async (req, res) => {
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
    /*
        getUserAvatar: async (req, res) => {
            let username = req.params.username;
            const users = await User.find({ username: username }).limit(1).skip(0);
            if (users === null || users.length === 0) {
                res.status(httpStatus.NOT_FOUND);
                res.send();
            }
            else {
                let user = users[0];
                fs.readFile(user.avatarUrl, function (err, data) {
                    if (err) {
                        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
                            message: err
                        });
                    }
                    res.writeHead(httpStatus.OK, { 'Content-Type': 'image/jpeg' });
                    res.end(data);
                });
            }
    
        },
    */
    saveAvatarUrl: async (req, res) => {
        let username = req.params.username;
        const users = await User.find({ username: username }).limit(1).skip(0);
        users[0].avatarUrl = req.file.path;
        users[0].save();
        res.send({ avatarUrl: users[0].avatarUrl });
    },

    checkUsernameExist: async (req, res, next) => {
        let username = req.params.username;
        const users = await User.find({ username: username }).limit(1).skip(0);
        if (users === null || users.length === 0) {
            res.status(400);
            res.send("Invalid user");
        } else {
            next();
        }
    },

    deleteById: async (req, res) => {
        let userId = req.params.id;
        console.log(userId);
        const users = await User.find({ _id: userId })
            .limit(1)
            .skip(0);
        console.log(users);
        if (users === null || users.length === 0) {
            res.status(400);
            res.send("User Not Found!!!")
        } else {
            const results = await User.remove({ _id: userId });
            res.send(results);
        }
    }

}

