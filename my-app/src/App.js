import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UserList from "./component/listUser.component";
import EditUser from "./component/editUser.component";
import CreateUser from "./component/createUser.component";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserList />
        </Route>
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/create" component={CreateUser} />

        {/* <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} /> */}
      </Switch>
    </Router>
  );
}

export default App;
