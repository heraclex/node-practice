import React from "react";
import NavBar from "./components/Navbar";
import UserTable from "./components/UserTable";
import userService from "./services/user.service";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoadingData: false
    };
  }

  // get data once component is ready on DOM
  componentDidMount() {
    this.loadDataSource();
  }

  loadDataSource() {
    this.setState({ isLoadingData: true });
    userService.getUsers().then(data => {
      this.setState({
        users: data,
        isLoadingData: false
      });

      console.log("list user avaialale in DB:", this.state.users);
    });
  }

  updateUsersList(newUser) {
    if (newUser != null
      && newUser != undefined) {
      let existed = this.state.users.find((user) => {
        return user.username === newUser.username;
      });
      if (!existed) {
        let users = this.state.users
        users.push(newUser)
        this.setState({ users: users })
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar onSearchReturn={this.updateUsersList.bind(this)} />
        <main role="main" className="container">
          <div className="starter-template">
            <h1>My React App!</h1>
            <UserTable
              data={this.state.users}
              isLoadingData={this.state.isLoadingData}
              refreshDataSource={this.loadDataSource.bind(this)} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
