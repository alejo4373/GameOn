import React, { Component } from "react";
import axios from "axios";

export default class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      profile_username: "",
      profile_email: "",
      profile_fullname: "",
      profile_zipcode: "",
      message: ""
    };
  }
  handleUsernameChange = e => {
    this.setState({
      profile_username: e.target.value
    });
  };

  handleEmailChange = e => {
    this.setState({
      profile_email: e.target.value
    });
  };

  handleFullNameChange = e => {
    this.setState({
      profile_fullname: e.target.value
    });
  };

  handleZipCodeChange = e => {
    const { zipcode } = this.state;
    const userZip = Number(e.target.value);
    if (!isNaN(userZip) && zipcode.length <= 5) {
      this.setState({
        profile_zipcode: e.target.value
      });
    }
  };

  editUserInfo = () => {
    const {
      profile_username,
      profile_email,
      profile_fullname,
      profile_zipcode
    } = this.state;

    const { username, email, fullname, zipcode, id } = this.props;
    axios
      .patch("/user/edit", {
        id: id,
        username: profile_username ? profile_username : username,
        email: profile_email ? profile_email : email,
        fullname: profile_fullname ? profile_fullname : fullname,
        zipcode: profile_zipcode ? profile_zipcode : zipcode
      })
      .then(res => {
        this.setState({
          profile_username: "",
          profile_email: "",
          profile_fullname: "",
          profile_zipcode: "",
          message: "Profile Has Been Updated"
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };
  render() {
    const { username, email, fullname, zipcode } = this.props;

    const {
      profile_username,
      profile_email,
      profile_fullname,
      profile_zipcode,
      message
    } = this.state;

    const {
      editUserInfo,
      handleEmailChange,
      handleFullNameChange,
      handleZipCodeChange,
      handleUsernameChange
    } = this;
    return (
      <div>
          <div id='users_stats'>

          </div>
        <div id='profile_form_container'>
          <form>
            <label className='profile_forms'>
             Name: <input
                type="text"
                name="Full name"
                placeholder={fullname}
                value={profile_fullname}
                onChange={handleFullNameChange}
              />
            </label>
            <label className='profile_forms' >
            Username:  <input
                type="text"
                name="username"
                placeholder={username}
                value={profile_username}
                onChange={handleUsernameChange}
              />
            </label>
            <label className='profile_forms'>
             Email: <input
                type="text"
                name="Email"
                placeholder={email}
                value={profile_email}
                onChange={handleEmailChange}
              />
            </label>
            <label className='profile_forms'>
            ZipCode  <input
                type="text"
                name="zip_code"
                placeholder={zipcode}
                value={profile_zipcode}
                onChange={handleZipCodeChange}
              />
            </label>
          </form>
          <button id='update_button' onClick={editUserInfo}>Update</button>
          <div>{message}</div>
        </div>
      </div>
    );
  }
}
