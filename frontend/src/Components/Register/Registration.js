import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

import SportTiles from "./SportsTiles.jsx";

class Registration extends Component {
  state = {
    email: "",
    fullname: "",
    username: "",
    password: "",
    confirmPass: "",
    zipcode: "",
    message: "",
    nextPressed: false,
    registered: false,
    alert: false,
    loggedIN: false,
    selectedSports: []
  };

  checkedIfUserLoggedIn = () => {
    axios.get("/logged").then(res => {
      this.setState({
        loggedIN: res.data.loggedin
      });
    });
  };

  handleInputFields = e => {
    const inputName = e.target.name
    const value = e.target.value
    this.setState({
      [inputName]: value
    });
  };

  handleZipCodeChange = e => {
    const { zipcode } = this.state;
    const userZip = Number(e.target.value);
    if (!isNaN(userZip) && zipcode.length <= 5) {
      this.setState({
        zipcode: e.target.value
      });
    }
  };

  validateAndNext = () => {
    const {
      username,
      password,
      confirmPass,
      email,
      fullname,
      zipcode
    } = this.state;

    if (
      !username ||
      !password ||
      !confirmPass ||
      !email ||
      !fullname||
      !zipcode
    ) {
      this.setState({
        password: "",
        confirmPass: "",
        alert: true,
        message: "Please complete all required fields"
      });
      return;
    }
    if (password.length < 5) {
      this.setState({
        password: "",
        confirm: "",
        alert: true,
        message: "Password length must be at least 5 characters"
      });
      return;
    }
    if (password!== confirmPass) {
      this.setState({
        passwordInput: "",
        confirmInput: "",
        alert: true,
        message: "Passwords do not match!"
      });
      return;
    }

    this.setState({
      nextPressed: true
    });
  };

  handleSportsSelection = e => {
    let { selectedSports } = this.state;
    const sportName = e.target.name;
    const sportId = e.target.id
    console.log('sportselected:', sportId, sportName)

    //Find if we already have the clicked sport in our array
    //if so it means our user wants to de-select it, so remove it, else add it
    let sportIndex = selectedSports.findIndex(sport => { 
      return sport.sport_id === sportId 
    })

    if(sportIndex) {
      //Removing ~ Deselecting
      selectedSports.splice(sportIndex, 1)
    } else {
      //Adding
      selectedSports.push({sport_id: sportId, sport_name: sportName})
    }

    this.setState({
      selectedSports: selectedSports
    });
  };

  submitForm = () => {
    const { username, password, email, fullname, zipcode, selectedSports } = this.state
    axios
    .post("/signup", {
      username,
      password,
      email,
      fullname,
      zipcode,
      sports: JSON.stringify(selectedSports)
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        registered: true,
        username: "",
        password: "",
        confirmPass: "",
        submitted: true,
        email: "",
        message: `Welcome to the site ${this.state.usernameInput}`
      });
    })
    .catch(err => {
      console.log("error: ", err);
      this.setState({
        usernameInput: "",
        passwordInput: "",
        confirmInput: "",
        emailInput: "",
        message: "Error inserting user"
      });
    });
  };

  componentDidMount() {
    this.checkedIfUserLoggedIn();
  }

  render() {
    const {
      email,
      fullname,
      username,
      password,
      confirmPass,
      message,
      zipcode,
      nextPressed,
      selectedSports,
      loggedIN
    } = this.state;

    const {
      submitForm,
      handleInputFields,
      handleZipCodeChange,
      handleSportsSelection,
    } = this;

    if (loggedIN) {
      return <Redirect to="/user" />;
    }

    return (
      <div className="parent">
        {nextPressed ? (
            <SportTiles
              selectedSports={selectedSports}
              handleSportsSelection={handleSportsSelection}
              submitForm={submitForm}
            />
        ) : (
          <div class="login-container">
            <div class="login-box">
              <form>
                <h1 className="title">GameOn</h1>
                <h2>Sign Up To Play, Compete, and Rank-Up</h2>
                <label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputFields}
                  />
                </label>
                <label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    value={fullname}
                    onChange={handleInputFields}
                  />
                </label>
                <label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputFields}
                  />
                </label>
                <label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleInputFields}
                  />
                </label>
                <label id="confirm">
                  <input
                    type="password"
                    name="confirmPass"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={this.handleInputFields}
                  />
                </label>
                <label>
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Zipcode"
                    value={zipcode}
                    onChange={handleZipCodeChange}
                  />
                </label>
              </form>
              <button onClick={this.validateAndNext}>Next</button>
              <p>{message}</p>
            </div>
            <div class="login-box">
              Have an account? <Link to="/login">Log in</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Registration;
