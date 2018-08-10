import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class UserSearchBar extends React.Component {
  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            name="username"
            id="examplePassword"
            placeholder="Search"
          />
        </FormGroup>
        <Button>Search</Button>
      </Form>
    );
  }
}
