import React from "react";
import ReactDOM from "react-dom";
// adding boostrap

import App from "./components/App";
import UserTable from "./components/userTable";

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<UserTable />, document.getElementById("user-table"));
