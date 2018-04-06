import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import { Redirect } from "react-router";
import axios from "axios";

import { Navbar, Nav, NavItem } from "react-bootstrap";
import './HUB.css'

import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import Events from "./HostEvents/EventForm";
//import CurrentEvent from "./HostEvents/CurrentEvent";
import EventProfile from "./HostEvents/EventProfile";
import Map from "./Map/Map";
import Leaderboard from "./Leaderboard/Leaderboard";


import MyEvents from "./HostEvents/CreatedEvent";


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
      <div id="hub-div"> 
        <div id="navbar-div">
          <Navbar inverse collapseOnSelect >
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/user/dashboard"><h2 id="app-Name">GameOn</h2></Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/user/map">
                  <NavItem eventKey={3}>Map</NavItem>
                </LinkContainer>

                <LinkContainer to="/user/leaderboard">
                  <NavItem eventKey={2}> Leaderboard </NavItem>
                </LinkContainer>
              </Nav>

              <Nav pullRight>
                <LinkContainer to="/user/profile">
                  <NavItem eventKey={1}> Settings </NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem onClick={handleLogOut}> Logout </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
          {/*Components Goes HERE*/}
          <Switch>
            <Route path="/user/dashboard" component={Dashboard} />
            <Route path="/user/profile" component={Profile} />
            <Route path="/user/map" component={Map} />
            <Route path="/user/leaderboard" component={Leaderboard} />
            <Route exact path="/user/event" component={Events} />
            {/* <Route exact path="/user/event/:id" component={EventProfile} /> */}
            <Route exact path="/user/event/:id" component={EventProfile} />
            <Route path="/user/event/myevents/:id" component={MyEvents}/>
          </Switch>
        </div>
    );
  }
}

export default HUB;
