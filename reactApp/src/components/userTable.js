import React from "react";
import { Table, Button } from "reactstrap";
import ApiHelper from "../helpers/apiHelper";

export default class UserTable extends React.Component {

  onDeleteUserClick(event) {
    var userId = event.target.getAttribute("user-id");
    if (userId) {
      ApiHelper.removeUser(userId).then(data => {
        console.log("data:", data);
      })
    }
  }

  render() {
    let userRows = this.props.data.map((user, i) => {
      return (
        <tr key={i}>
          <th scope="row">{user.username}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.url}</td>
          <td>{user.location}</td>
          <td><Button outline color="danger" user-id={user._id} onClick={this.onDeleteUserClick}>delete</Button></td>
        </tr>
      );
    });

    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th scope="col">UserName</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Url</th>
            <th scope="col">Location</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </Table>
    );
  }
}
