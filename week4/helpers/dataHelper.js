const fs = require("fs");

const dir = "localStorage";
const filePath = `${dir}/data.json`;

class dataHelper {
  insert(newuser) {
    fs.exists(filePath, exists => {
      if (!exists) {
        // create folder first
        fs.mkdir(dir, err => {
          if (err) throw err;
          // create a file
          fs.writeFile(
            filePath,
            JSON.stringify([newuser]),
            { flag: "wx" },
            err => {
              if (err) throw err;
              console.log("The file has been saved!");
            }
          );
        });
      } else {
        //
        fs.readFile(filePath, function(err, data) {
          if (err) throw err;
          let users = JSON.parse(data);
          users.push(newuser);
          fs.writeFile(filePath, JSON.stringify(users), err => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
        });
      }
    });
  }

  update(username, userData) {
    return new Promise(function(resolve, reject) {
      fs.exists(filePath, exists => {
        if (!exists)
          reject(new Error("File not found while trying to update user-data"));

        fs.readFile(filePath, function(err, data) {
          if (err) reject(err);
          let users = JSON.parse(data);
          let user = users.filter(u => u.login === username)[0];
          user.name = userData.name;
          console.log(user);
          fs.writeFile(filePath, JSON.stringify(users), err => {
            if (err) reject(err);
            resolve(true);
          });
        });
      });
    });
  }

  async getUser(username) {
    if (fs.existsSync(filePath)) {
      let users = await readFilePromise(filePath);
      let results = users.filter(user => user.login === username);
      return results.length > 0 ? results[0] : null;
    }
    return null;
  }

  async getAllUsers() {
    if (fs.existsSync(filePath)) {
      return await readFilePromise(filePath);
    }
    return null;
  }
}

module.exports = new dataHelper();

/**
 * Read file Promise
 */
readFilePromise = filePath => {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};
