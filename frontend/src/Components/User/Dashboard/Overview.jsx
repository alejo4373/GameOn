import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Upcoming from "./Upcoming";
import UsersEvent from "./UsersEvent";
import History from "./History";
import Notifications from "../Notification";
class Overview extends Component {
  state = {
    user: [],
    loggedOut: false,
    profileClicked: false,
    hostedEvents: [],
    usersEvents: [],
    historyEvents: [],
    addPressed: false
  };

  getUserInfo = () => {
    axios
      .get("/user/getinfo")
      .then(res => {
        this.setState({
          user: [res.data.user]
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };

  getUserHistory = () => {
    axios
      .get("/user/events/history")
      .then(res => {
        console.log("History", res.data);
        this.setState({
          historyEvents: res.data.events.reverse()
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };

  getUsersEvents = () => {
    axios
      .get("/user/events")
      .then(res => {
        this.setState({
          usersEvents: res.data.events.reverse()
        });
      })
      .catch(err => console.log("Error:", err));
  };

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
          hostedEvents: res.data.events.reverse()
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
    this.getUserHistory();
  }

  render() {
    const {
      user,
      loggedOut,
      profileClicked,
      hostedEvents,
      addPressed,
      usersEvents,
      historyEvents
    } = this.state;

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
        {user.map((u, i) => {
          return (
            <div id="Overview">
              <div className="left-top-half">
                <div className="left-container">
                  <div className="left-top">
                    <img
                      id="Overview_photo"
                      src={u.profile_pic}
                      width="180px"
                      alt=""
                    />
                    <h3 className="username">{u.username.toUpperCase()}</h3>
                  </div>
                  <div className="left-bottom">
                    <button
                      className="newGame-btn"
                      onClick={() => this.setState({ addPressed: true })}
                    >
                      <img id="add-btn" src="/images/add-btn.png" />
                    </button>
                    <div id='circularProgressBar-container' >
                       <h3>Level 2</h3> 
                        <CircularProgressbar 
                        percentage={u.exp_points/100}
                        initialAnimation={'true'}
                        textForPercentage={() => `${u.exp_points}`}
                        />
                      </div>
                    <div />
                  </div>
                </div>
              </div>

              <div className="right-half">
                <div className="inner-right">
                  <div id="dashboard-tabs">
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                      <Tab eventKey={1} title="Past Event">
                        <History events={historyEvents} />
                      </Tab>
                      <Tab eventKey={2} title="Upcoming Events">
                        <Upcoming events={hostedEvents} />
                      </Tab>
                      <Tab eventKey={3} title="My Events">
                        <UsersEvent events={usersEvents} />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Overview;
