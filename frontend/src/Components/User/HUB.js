import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

import { Navbar, NavDropdown, Nav, NavItem, MenuItem } from "react-bootstrap";

import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import Events from "./HostEvents/EventForm";
import CurrentEvent from "./HostEvents/CurrentEvent"
import Map from "./Map/Map";
import Leaderboard from "./Leaderboard/Leaderboard"

class HUB extends Component {
  state = { loggedOut: false };
  handleLogOut = () => {
    axios.get("/logout").then(() => {
      this.setState({
        loggedOut: true
      });
    });
  };
  render() {
    const { handleLogOut } = this;
    return (
      <div>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/user/dashboard">GameOn</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  <Link to="/user/map">Map</Link>
                </NavItem>
                <NavItem eventKey={2} href="#">
                  <Link to="/user/leaderboard">Leaderboard</Link>
                </NavItem>
                <NavDropdown
                  eventKey={3}
                  title="Events"
                  id="basic-nav-dropdown"
                >
                  <MenuItem eventKey={3.1}>Host</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                  Settings
                </NavItem>
                <NavItem>
                  <Link to="/login" onClick={handleLogOut}>
                    Logout
                  </Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          {/*Components Goes HERE*/}
          <Switch>
            <Route path="/user/dashboard" component={Dashboard} />
            <Route path="/user/profile" component={Profile} />
            <Route path="/user/map" component={Map} />
            <Route path="/user/leaderboard" component={Leaderboard} />
            <Route exact path="/user/event" component={Events} />
            <Route path="/user/event/:id" component={CurrentEvent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default HUB;
