import React from "react";
import NavBar from "./components/Navbar";
import UserTable from "./components/userTable";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <main role="main" className="container">
          <div className="starter-template">
            <h1>My React App!</h1>
            <UserTable />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
