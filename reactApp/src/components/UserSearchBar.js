import React from "react";
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ApiHelper from "../helpers/apiHelper";

export default class UserSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      searchText: "",
      btnSearchInnerHtml: "Search"
    };
    this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
  }
  modalToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  onSearchBtnClick(event) {
    if (this.state.searchText.length > 3) {
      this.setState({ btnSearchInnerHtml: (<div className='loader'></div>) });
      ApiHelper.getUser(this.state.searchText).then(data => {
        if (data) {
          console.log("data return from SearchBar:", data);
          this.props.onSearchReturn(data);
        } else {
          // show error message
          this.modalToggle();
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
        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>OPP!</ModalHeader>
          <ModalBody>
            No Git User found
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalToggle}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
