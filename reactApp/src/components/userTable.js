import React from "react";
import { Table, Button } from "reactstrap";
import ApiHelper from "../helpers/apiHelper";
import "../css/loader.css";
export default class UserTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false
    };

    this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
  }

  onDeleteUserClick(event) {
    var userId = event.target.getAttribute("user-id");
    if (userId) {
      var trashElement = event.target.getElementsByTagName('i')[0];
      var loaderElement = event.target.getElementsByTagName('div')[0];
      trashElement.style.display = 'none';
      loaderElement.style.display = 'block';
      ApiHelper.removeUser(userId).then(data => {
        trashElement.style.display = 'block';
        loaderElement.style.display = 'none';
        console.log("REMOVE user response data:", data);
        this.props.refreshDataSource();
      })
    }
  }

  render() {
    let userRows = (!this.props.isLoadingData && this.props.data.length === 0)
      ?
      (<tr><td colSpan="6" scope="row" align="center">No data...</td></tr>)
      :
      this.props.data.map((user, i) => {
        return (
          <tr key={i}>
            <th scope="row">{user.username}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.url}</td>
            <td>{user.location}</td>
            <td>
              <Button key={user._id} outline color="danger" user-id={user._id} onClick={this.onDeleteUserClick}>
                <i className='far fa-trash-alt' style={{ display: 'block' }}></i>
                <div className='loader' style={{ display: 'none' }}></div>
              </Button>
            </td>
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
        <tbody style={!this.props.isLoadingData ? {} : { display: 'none' }}>{userRows}</tbody>
        <tfoot style={this.props.isLoadingData ? {} : { display: 'none' }}>
          <tr>
            <td colSpan="6">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                  aria-valuemax="100" style={{ width: '100%' }}></div>
              </div>
            </td>
          </tr>
        </tfoot>
      </Table >
    );
  }
}
