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
        {user.map((u, i) => {
          return (
            <div key={i} id="Overview">
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
                  <h3>{u.username.toUpperCase()}</h3>
                </div>
                <div id="xp_header">
                  <h3>XP: {u.exp_points} pts</h3>
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
                  width: "200px",
                  height: "150px",
                  position: 'absolute',
                  margin: '10% 0 0 60%'
                }}>
                  <img src='/images/gold-trophy.png' width={'105px'} alt=''/>
                </div>
              <div
                style={{
                  width: "100px",
                  border: "0.3px solid black",
                  backgroundColor: "#0C6195",
                  margin: "55% 0 0 40%",
                  height: "50px",
                  color: 'white',
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

/**
 * <div id="user_selectedSports_container">
                  {u.sports.map(s => {
                    return (
                      <div className="user_selectedSports">
                        <div className="sports_name_skills">
                          Sport: {s.name.toUpperCase()} Skill: {s.id}
                          <ProgressBar
                            bsStyle="success"
                            now={20}
                            label={`${20}%`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
 */
