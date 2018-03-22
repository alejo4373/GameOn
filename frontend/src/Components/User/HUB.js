import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";


import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";

class HUB extends Component {
  render() {
    return (
      <div>
        {/*Navigation Bar Goes HERE*/}
        <nav>
          <Link to="/user/dashboard">USER</Link>
        </nav>

        {/*Components Goes HERE*/}
        <Switch>
          <Route path="/user/dashboard" component={Dashboard} />
          <Route path="/user/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default HUB;
