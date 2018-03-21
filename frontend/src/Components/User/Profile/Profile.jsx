import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import {ProgressBar} from 'react-bootstrap'
import axios from "axios";

class Profile extends Component {
  state = {
    user: [
      {
        username: "Kelvito911",
        selectedSports: [
          { name: "baseball", skill: "beginner", level: 21 },
          { name: "soccer", skill: "expert", level: 98 },
          { name: "basketball", skill: "intermediate", level: 45 }
        ],
        img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        exp_points: 820
      }
    ],

    edit: false
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
          loggedIN: false
        });
      })
      .catch(err => console.log("Error:", err));
  };

  render() {
    const { user, loggedIN, edit } = this.state;
    const { handleEditProfile, handleLogOut } = this;

    if (edit) {
      this.setState({
        edit: false
      });
      return <Redirect to="/edit" />;
    }

    return (
      <div>
        {user.map(u => {
          return (
            <div id="profile">
              <div id="photo_container">
                <img id="profile_photo" src={u.img} width="130px" />
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
                  {u.selectedSports.map(s => {
                    return (
                      <div className="user_selectedSports">
                        <div className="sports_name_skills">
                          Sport: {s.name.toUpperCase()} {' '}
                          Skill: {s.skill}
                        <ProgressBar 
                        bsStyle="success"
                        now={s.level} 
                        label={`${s.level}%`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        {/* <button onClick={this.handleLogOut}>Log Off</button> */}
      </div>
    );
  }
}

export default Profile;
