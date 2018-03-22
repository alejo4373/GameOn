import React, { Component } from "react";
import axios from "axios";

import UserInfo from './UserInfo'

class Profile extends Component {
  state = {
    user: [],
    edit: false,
    enable: false,
  };

  getUserInfo = () => {
    axios
      .get("/user/getinfo")
      .then(res => {
        console.log(res.data.user);
        this.setState({
          user: res.data.user
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };


  handleEditProfile = () => {
    this.setState({
      edit: true
    });
  };

  handleDisplayInfo = (e) => {
    if(e.target.id === 'profile_personal_info'){
      this.setState({
        enable: false
      })
    }else if(e.target.id === 'profile_sport_info')
    this.setState({
      enable: true
    })
  }

 
  componentWillMount() {
    this.getUserInfo();
  }

  render() {
    const { handleEditProfile, handleDisplayInfo } = this;
    const { user, enable } = this.state;

    // if (edit) {
    //   this.setState({
    //     edit: false
    //   });
    //   return <Redirect to="/edit" />;
    // }


    return (
      <div className="profile_parent">
        <div id="profile_menu">
          <div id='profile_header'>
            <img src={user.profile_pic} id="profile_photo" />
            <div id="profile_username">{user.username}</div>
          </div>
          <div id="profile_personal_info" 
          onClick={handleDisplayInfo}
          >
          Personal Info
          </div>
          <div id="profile_sport_info" 
          onClick={handleDisplayInfo}
          >
          Your Sports
          </div>
        </div>

        <div id='profile_info'>
        {
        <UserInfo
        id={user.id}
        username ={user.username}
        email = {user.email}
        fullname = {user.fullname}
        zipcode = {user.zip_code}
        />}
        </div>
      </div>
    );
  }
}

export default Profile;

/**
 * <button id="edit_Overview_button" onClick={handleEditProfile}>
          Edit Profile
        </button>
 */
