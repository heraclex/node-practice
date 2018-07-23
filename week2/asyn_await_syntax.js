async function main2() {
  let obj = {};
  try {
    const userProfileURL = "https://api.github.com/users/" + username;
    const followingURL = `https://api.github.com/users/${username}/following`;
    const starURL = `https://api.github.com/users/${username}/starred`;
    JSON.parse("");
    const [userData, followings, starred] = await Promise.all([
      getData(userProfileURL),
      getData(followingURL),
      getData(starURL)
    ]);
    userData.followings = followings;
    userData.starred = starred;
    try {
      userData.followers = await getData(userData.followers_url);
    } catch (error) {}

    fs.writeFile(`./${username}.json`, JSON.stringify(userData), error => {
      if (error) return console.log(error);
      return console.log("File created successfully!");
    });
  } catch (error) {
    // handle error
  }
}
