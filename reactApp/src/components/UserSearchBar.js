import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ApiHelper from "../helpers/apiHelper";

export default class UserSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.onSearchBarChange = this.onSearchBarChange.bind(this)
    this.onSearchBtnClick = this.onSearchBtnClick.bind(this)
  }

  onSearchBarChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  onSearchBtnClick(event) {
    if (this.state.query.length > 3) {
      ApiHelper.getUser(this.state.query).then(data => {
        console.log("data:", data);
        this.props.onSearchReturn(data);
      })
    }
  }

  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            placeholder="username..."
            onChange={this.onSearchBarChange}
          />
        </FormGroup>
        <Button onClick={this.onSearchBtnClick}>Search</Button>
      </Form>
    );
  }
}
