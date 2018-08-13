export default new class ApiHelper {
  constructor() {
    this.apiUrl = "http://localhost:3000/api";
  }
  getUsers() {
    return fetch(this.apiUrl + "/users").then(results => {
      return results.json();
    });
  }

  getUser(username) {
    return fetch(this.apiUrl + "/users/" + username).then(results => {
      console.log("results from search ", results);
      return results.json();
    });
  }

  removeUser(username) {
    return fetch(this.apiUrl + "/users/" + username, {
      method: 'delete'
    }).then(results => {
      return results.json();
    });
  }
}();