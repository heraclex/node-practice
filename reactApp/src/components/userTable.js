import React from "react";
import { Table, Button } from "reactstrap";
import userService from "../services/user.service";
import "../css/loader.css";
import UserAvata from "./UserAvata";
export default class UserTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      popovers: []
    };

    this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
    this.removeUserAvatarPopover = this.removeUserAvatarPopover.bind(this);
    this.addUserAvatarPopover = this.addUserAvatarPopover.bind(this);
  }

  onDeleteUserClick(event) {
    var userId = event.target.getAttribute("user-id");
    if (userId) {
      var trashElement = event.target.getElementsByTagName('i')[0];
      var loaderElement = event.target.getElementsByTagName('div')[0];
      trashElement.style.display = 'none';
      loaderElement.style.display = 'block';
      userService.removeUser(userId).then(response => {
        trashElement.style.display = 'block';
        loaderElement.style.display = 'none';
        console.log("Response on DELETE request:", response);

        this.removeUserAvatarPopover(userId);
        this.props.refreshDataSource();
      })
    }
  }

  showUserAvatar(userId, avatarUrl) {
    let avatar = this.state.popovers.find((p) => {
      return p.id === userId;
    });
    if (avatar && avatar.popover) {
      avatar.popover.setAvatarUrl(avatarUrl);
      avatar.popover.toggle();
    }
  }

  removeUserAvatarPopover(userId) {
    let popovers = this.state.popovers;
    let index = popovers.findIndex(x => x.id === userId);
    if (index !== -1) {
      popovers.splice(index, 1);
      this.setState({ popovers: popovers });
    }
  }

  addUserAvatarPopover(newPopover) {
    let index = this.state.popovers.findIndex(x => x.id === newPopover.id);
    if (index < 0 && newPopover.popover) {
      this.state.popovers.push(newPopover);
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
            <td scope="row">
              <Button key={'user-name-' + i} color="link" id={'avatar-' + user._id}
                onClick={(e) => { this.showUserAvatar(user._id, user.avatarUrl); }}>
                {user.username}
              </Button>
              <UserAvata username={user.username} key={'user-avatar-' + i} target={'avatar-' + user._id}
                ref={(instance) => { this.addUserAvatarPopover({ id: user._id, popover: instance }) }} />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.url}</td>
            <td>{user.location}</td>
            <td>
              <Button key={'delete-user-btn' + i} outline color="danger" user-id={user._id} onClick={this.onDeleteUserClick}>
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