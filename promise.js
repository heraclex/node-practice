const request = require('request');
const fs = require('fs');

class promiseExercise {
    getGithubProfile(username){

        const resolveFollowers = (user) => {
            return getData(user.followers_url).then((followers)=>{
                user.followers = followers;
                return user;
            });
        };

        const resolveFollowings = (user) => {
            const followingsUrl = `https://api.github.com/users/${user.login}/following`;
            return getData(followingsUrl).then((followings)=>{
                user.followings = followings;
                return user;
            });
        };

        const resolveStarred = (user) => {
            const startedUrl = `https://api.github.com/users/${user.login}/starred`;
            return getData(startedUrl).then((starred)=>{
                fs.writeFile(`./${username}.json`, JSON.stringify(obj), (err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, obj)
                    }
                });
                user.starred = starred;
                return user;
            });
        };

        const onError = (err) => {
            //do somthing
            console.log(`ERROR + ${err}`)
        };

        return new Promise((resolve, reject) => {
            getData('https://api.github.com/users/' + username)
            .then(resolveFollowers)
            .then(resolveFollowings)
            .then(resolveStarred)
            .catch(onError);
        });
    }
}

module.exports = new promiseExercise();

//*** private funciton ****//
getData = (url) => {
    const GITHUB_TOKEN = 'f5b6a9c5747ed5d155ec5273a2d2d34771b80374';
    const options = {
        uri: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
            'Authorization': `token ${GITHUB_TOKEN}`  
        }
    }

    // return new Promise wrapper
    return new Promise((resolve, reject) => {
        request.get(options, (err, response) => {
            if (err) reject(err);
            else resolve(JSON.parse(response.body));
        })
    });
}