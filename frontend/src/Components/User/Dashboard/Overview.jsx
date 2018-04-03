import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Upcoming from "./Upcoming";
import UsersEvent from "./UsersEvent";


class Overview extends Component {
  state = {
    user: [],
    loggedOut: false,
    profileClicked: false,
    hostedEvents: [],
    usersEvents: [],
    addPressed: false
  };

  getUserInfo = () => {
    axios
      .get("/user/getinfo")
      .then(res => {
        console.log(res.data.user);
        this.setState({
          user: [res.data.user]
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };


  getUsersEvents = () => {
    axios
    .get('/user/events')
    .then(res => {
        this.setState({
          usersEvents: res.data.events
        })
    }).catch(err => console.log("Error:", err))
  }

  getUserCurrentLocation = callback => {
    var options = {
      enableHighAccuracy: true,
      timeout: 500,
      maximumAge: 0
    };

    function error(err) {
      console.log("error", err);
      callback(40.7128, -73.935242);
    }
    function showPosition(position) {
      if (position) {
        callback(position.coords.latitude, position.coords.longitude);
      }
    }

    navigator.geolocation.getCurrentPosition(showPosition, error, options);
  };

  getAllHostedEvents = (latitude, longitude) => {
    axios
      .get(`/event/radius?lat=${latitude}&long=${longitude}&radius=${10}`)
      .then(res => {
        console.log("HostData:", res.data);
        this.setState({
          hostedEvents: res.data.events
        });
      });
  };

  handleLogOut = () => {
    axios
      .get("/logout")
      .then(() => {
        this.setState({
          loggedOut: true
        });
      })
      .catch(err => console.log("Error:", err));
  };

  redirectToUserProfile = () => {
    this.setState({
      profileClicked: true
    });
  };

  componentWillMount() {
    this.getUserInfo();
    this.getUserCurrentLocation(this.getAllHostedEvents);
    this.getUsersEvents();
  }

  render() {
    const { user, loggedOut, profileClicked, hostedEvents, addPressed, usersEvents} = this.state;

    if (loggedOut) {
      this.setState({
        loggedOut: false
      });
      return <Redirect to="/" />;
    }

    if (addPressed) {
      this.setState({
        profileClicked: false
      });
      return <Redirect to="/user/event" />;
    }

    return (
      <div>
        {user.map((u,i) => {
          return (
            <div key ={i} id="Overview">
              <div className="header">
              <div id="photo_container">
                <img
                  id="Overview_photo"
                  src={u.profile_pic}
                  width="180px"
                  alt=""
                />
              </div>
              <div id="Overview_description">
                <div id="username">
                  <h3 className="username">{u.username.toUpperCase()}</h3>
                </div>
                <div>Sports: {u.sports.map(elem => <p>{elem.name}</p>)}</div>
                <div id="xp_header">
                  <h2>
                    XP: <span className="points">{u.exp_points} pts</span>
                  </h2>
                  <ProgressBar
                    style={{ width: "200px" }}
                    bsStyle="success"
                    now={u.exp_points}
                    label={`${u.exp_points} xp`}
                  />
                </div>
                </div>
                {/* <div
                  id="medal-container"
                  style={{
                    height: "150px",
                    position: "absolute"
                  }}
                >
                  <h3 className="medal">
                  Medals
                  </h3>
                  <img
                    className="medal-img"
                    src="/images/gold-trophy.png"
                    width={"105px"}
                    alt=""
                  />
                </div> */}
                <div id="dashboard-tabs">
                  <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Past Event" />
                    <Tab eventKey={2} title="Upcoming Events">
                      <Upcoming events={hostedEvents} />
                    </Tab>
                    <Tab eventKey={3} title="My Events" >
                    <UsersEvent events={usersEvents} />
                    </Tab>
                  </Tabs>
                </div>
              </div>
              <button className='newGame-btn' onClick={() => this.setState({addPressed: true})}><img id='add-btn' src='/images/add-btn.png' /></button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Overview;

