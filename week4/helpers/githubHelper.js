const request = require("request");

class githubHelper {
  async get(username) {
    try {
      const userProfileURL = "https://api.github.com/users/" + username;
      const followingURL = `https://api.github.com/users/${username}/following`;
      const starURL = `https://api.github.com/users/${username}/starred`;
      //JSON.parse("");
      const [userData, followings, starred] = await Promise.all([
        getData(userProfileURL),
        getData(followingURL),
        getData(starURL)
      ]);
      userData.followings = followings;
      userData.starred = starred;
      userData.followers = await getData(userData.followers_url);
      return userData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new githubHelper();

function getData(url) {
  const GITHUB_TOKEN = "741cf4d240de4179a7326b8b41f73d9a9fefe6c1";
  const options = {
    uri: url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
      Authorization: `token ${GITHUB_TOKEN}`
    }
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}
