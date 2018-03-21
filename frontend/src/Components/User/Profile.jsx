import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import axios from 'axios'

class Profile extends Component {
  state = {
    user: [
      {
        username: "Kelvito911",
        selectedSports: ["baseball", "soccer", "basketball"],
        img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        exp_points: 820
      }
    ],

    loggedIN: true
  };

  handleLogOut = () => {
    axios
    .get('/logout')
    .then(() => {
        this.setState({
            loggedIN: false
        })
    })
    .catch(err => console.log('Error:', err))
  }



  render() {
    const { user, loggedIN } = this.state;

    if(!loggedIN){
        return <Redirect to='/' />
    }
    return (
      <div>
        {user.map(u => {
          return (
            <div id="profile">
              <div id="photo_container">
                <img id="profile_photo" src={u.img} width="100px" />
              </div>
              <div id="profile_description">
                <span id="username">
                  <h3>{u.username}</h3>
                </span>
                <span id="xp_header">
                  <h5>XP: {u.exp_points} pts</h5>
                </span>
                <div id="user_selectedSports_container">
                  {u.selectedSports.map(s => {
                    return (
                      <span className="user_selectedSports">
                        <h4>{s}</h4>
                      </span>
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
