import React from "react";
import NavBar from "./components/Navbar";
import UserTable from "./components/UserTable";
import ApiHelper from "./helpers/apiHelper";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  // get data once component is ready on DOM
  componentDidMount() {
    ApiHelper.getUsers().then(data => {
      this.setState({ users: data });
      console.log("app users", this.state.users);
    });
  }

  updateUsersList(newUser) {
    if (newUser != null
      && newUser != undefined
      && !this.state.users.includes(newUser)) {
      let users = this.state.users;
      users.push(newUser);
      this.setState({ users: users });
    }
  }

  render() {
    return (
      <div>
        <NavBar onSearchReturn={this.updateUsersList.bind(this)} />
        <main role="main" className="container">
          <div className="starter-template">
            <h1>My React App!</h1>
            <UserTable data={this.state.users} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
