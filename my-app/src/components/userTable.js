import React from "react";
import { Table } from "reactstrap";

class UserTable extends React.Component {
  constructor() {
    super();
    this.state = {
      userRows: []
    };
  }

  componentDidMount() {
    var apiUrl = "http://localhost:3000/api/users/";
    fetch(apiUrl)
      .then(results => {
        return results.json();
      })
      .then(data => {
        let userRows = data.map(user => {
          return (
            <tr>
              <th scope="row">{user.username}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.url}</td>
              <td>{user.location}</td>
            </tr>
          );
        });

        this.setState({ userRows: userRows });
        console.log("state", this.state.userRows);
      });
  }
  render() {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th scope="col">UserName</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Url</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>{this.state.userRows}</tbody>
      </Table>
    );
  }
}

export default UserTable;
