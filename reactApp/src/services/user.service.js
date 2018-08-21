export default new class userService {

  constructor() {
    this.baseUrl = "http://localhost:3000";
    this.apiUrl = "http://localhost:3000/api/v1";
  }

  getUsers() {
    return fetch(this.apiUrl + "/users", {
      method: 'GET'
    }).then(results => {
      return results.json();
    });
  }

  getUser(username) {
    return fetch(this.apiUrl + "/users/" + username, {
      method: 'GET'
    }).then(results => {
      if (results.status !== 404) {
        console.log("results from search ", results);
        return results.json();
      }
      return null;
    });
  }

  getAvatar(username) {
    return fetch(this.apiUrl + "/users/" + username + "/avatar", {
      method: 'GET'
    }).then(results => {
      return results.json();
    })
  }

  removeUser(userId) {
    return fetch(this.apiUrl + "/users/" + userId, {
      method: 'DELETE'
    }).then(results => {
      return results.json();
    });
  }

  uploadAvatar(username, file) {
    let data = new FormData();
    data.append('avatar', file)
    return fetch(this.apiUrl + "/users/" + username + "/avatar", {
      method: 'POST',
      body: data // This is your file object
    }).then(results => { return results.json() })
  }

}();
