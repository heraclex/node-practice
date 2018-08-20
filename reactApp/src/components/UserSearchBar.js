import React from "react";
//import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "../../../../../Library/Caches/typescript/2.9/node_modules/@types/reactstrap";
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ApiHelper from "../helpers/apiHelper";
import MessageModal from "./modals/MessageModal"

export default class UserSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotFoundMessage: false,
      noUserFoundOnGitMess: "No user found",
      searchText: "",
      btnSearchInnerHtml: "Search",
    };
    this.onSearchBtnClick = this.onSearchBtnClick.bind(this);

    this.MessageModal = React.createRef();
  }

  onSearchBtnClick(event) {
    event.preventDefault();
    if (this.state.searchText.length > 3) {
      this.setState({ btnSearchInnerHtml: (<div className='loader'></div>) });
      ApiHelper.getUser(this.state.searchText).then(data => {
        if (data) {
          console.log("data return from SearchBar:", data);
          this.props.onSearchReturn(data);
        } else {
          // show message 'User NOt Found in GitHub'
          this.MessageModal.setMessage(`No account found on GitHub with user ${this.state.searchText}`);
          this.MessageModal.toggle();
        }
        this.setState({ searchText: "", btnSearchInnerHtml: "Search" });
      })
    }
  }

  render() {
    return (
      <div>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="text"
              placeholder="username..."
              onChange={(event) => { this.setState({ searchText: event.target.value }) }}
              value={this.state.searchText}
            />
          </FormGroup>
          <Button onClick={this.onSearchBtnClick}>
            {this.state.btnSearchInnerHtml}
          </Button>
        </Form>
        <MessageModal ref={(instance) => { this.MessageModal = instance; }} />
      </div>
    );
  }
}