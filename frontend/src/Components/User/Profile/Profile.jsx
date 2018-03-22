import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";

class Profile extends Component {
  state = {
    user: [],
    loggedOut: false,
    edit: false
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

  handleEditProfile = () => {
    this.setState({
      edit: true
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

  componentWillMount() {
    this.getUserInfo();
  }

  render() {
    const { user, loggedOut, edit } = this.state;
    const { handleEditProfile, handleLogOut } = this;

    if (edit) {
      this.setState({
        edit: false
      });
      return <Redirect to="/edit" />;
    }

    if (loggedOut) {
      this.setState({
        loggedOut: false
      });
      return <Redirect to="/" />;
    }

    return (
      <div>
        {user.map(u => {
          return (
            <div id="profile">
              <div id="photo_container">
                <img id="profile_photo" src={u.profile_pic} width="130px" />
              </div>
              <div id="profile_description">
                <span id="username">
                  <h3>{u.username}</h3>
                </span>
                <button id="edit_profile_button" onClick={handleEditProfile}>
                  Edit Profile
                </button>
                <span id="xp_header">
                  <h3>XP: {u.exp_points} pts</h3>
                </span>
                <div id="user_selectedSports_container">
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
              </div>
            </div>
          );
        })}
        <button onClick={this.handleLogOut}>Log Off</button>
      </div>
    );
  }
}

export default Profile;
