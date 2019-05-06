import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tabs, Tab, Button } from "react-bootstrap";
import axios from "axios";
import EventCardsList from "./EventCardsList";
// eslint-disable-next-line 
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
      callback(40.731643, -74.008397);
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
            <div className="card two-sided">
              <div className="card left">
                <div className="card-content">
                  <div className="top flex-centered-justified">
                    <div className="protector">
                      <img
                        className="circle-med"
                        src={u.profile_pic}
                        alt="user"
                      />
                      <h1 className="username">{u.username}</h1>
                      <Button bsStyle="primary" onClick={() => this.setState({ addPressed: true })} >
                        Host a Game
                      </Button>
                    </div>
                  </div>
                  <div className="bottom flex-centered-justified bkgnd-primary-color">
                    <div className="protector">
                      <h1>Level 2</h1> 
                      
                      <div className="circle-med">
                        <CircularProgressbar 
                          percentage={u.exp_points/10}
                          initialAnimation={'true'}
                          textForPercentage={() => `${u.exp_points}`}
                        />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
              </div>

              <div className="card right">
                <div className="card-content">
                  <Tabs defaultActiveKey={2} id="tabs">
                    <Tab eventKey={1} title="History" >
                      <EventCardsList events={historyEvents} />
                    </Tab>
                    <Tab eventKey={2} title="Upcoming">
                      <EventCardsList events={hostedEvents} />
                    </Tab>
                    <Tab eventKey={3} title="My Events">
                      <EventCardsList events={usersEvents} />
                    </Tab>
                  </Tabs>
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
