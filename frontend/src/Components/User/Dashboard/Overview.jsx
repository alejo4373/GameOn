import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";

class Overview extends Component {
  state = {
    user: [],
    loggedOut: false,
    profileClicked: false
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
  }

  render() {
    const { user, loggedOut, profileClicked } = this.state;

    if (loggedOut) {
      this.setState({
        loggedOut: false
      });
      return <Redirect to="/" />;
    }

    if (profileClicked) {
      this.setState({
        profileClicked: false
      });
      return <Redirect to="/user/profile" />;
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
                <div
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
                </div>
              </div>
              <div
                style={{
                  width: "100px",
                  border: "0.3px solid black",
                  backgroundColor: "#0C6195",
                  margin: "55% 0 0 40%",
                  height: "50px",
                  color: "white"
                }}
              >
                New Game
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Overview;

