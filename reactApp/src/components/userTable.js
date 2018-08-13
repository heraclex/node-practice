import React from "react";
import { Table } from "reactstrap";

export default class UserTable extends React.Component {
  render() {
    let userRows = this.props.data.map((user, i) => {
      return (
        <tr key={i}>
          <th scope="row">{user.username}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.url}</td>
          <td>{user.location}</td>
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
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </Table>
    );
  }
}
