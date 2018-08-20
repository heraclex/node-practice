export default new class ApiHelper {

  constructor() {
    this.apiUrl = "http://localhost:3000/api/v1";
  }

  getUsers() {
    return fetch(this.apiUrl + "/users").then(results => {
      return results.json();
    });
  }

  getUser(username) {
    return fetch(this.apiUrl + "/users/" + username).then(results => {
      if (results.status !== 404) {
        console.log("results from search ", results);
        return results.json();
      }
      return null;
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
