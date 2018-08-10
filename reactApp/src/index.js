import React from "react";
import ReactDOM from "react-dom";
// adding boostrap
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import UserTable from "./components/userTable";

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<UserTable />, document.getElementById("user-table"));
