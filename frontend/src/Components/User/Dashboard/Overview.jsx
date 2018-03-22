import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";

class Overview extends Component {
  state = {
    user: [],
    loggedOut: false,
    profileClicked: false,
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
      })
  }

  componentWillMount() {
    this.getUserInfo();
  }

  render() {
    const { user, loggedOut, profileClicked } = this.state;
    const { handleLogOut, redirectToUserProfile } = this;


    if (loggedOut) {
      this.setState({
        loggedOut: false
      });
      return <Redirect to="/" />;
    }

    if(profileClicked){
      this.setState({
        profileClicked: false
      })
      return <Redirect to="/user/profile" />
    }

    return (
      <div>
        {user.map(u => {
          return (
            <div id="Overview" onClick={redirectToUserProfile}>
              <div id="photo_container">
                <img id="Overview_photo" src={u.profile_pic} width="130px" />
              </div>
              <div id="Overview_description">
                <span id="username">
                  <h3>{u.username.toUpperCase()}</h3>
                </span>
                <span id="xp_header">
                  <h3>XP: {u.exp_points} pts</h3>
                </span>
              </div>
            </div>
          );
        })}
        {/* <button onClick={this.handleLogOut}>Log Off</button> */}
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
