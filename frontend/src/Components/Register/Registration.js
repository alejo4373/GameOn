import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import Selection from "./Selection";

class Registration extends Component {
  state = {
    emailInput: "",
    fullNameInput: "",
    usernameInput: "",
    passwordInput: "",
    confirmInput: "",
    zipcodeInput: "",
    message: "",
    nextPressed: false,
    registered: false,
    alert: false
  };

  handleUsernameChange = e => {
    this.setState({
      usernameInput: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      passwordInput: e.target.value
    });
  };

  handleConfirmChange = e => {
    this.setState({
      confirmInput: e.target.value
    });
  };

  handleEmailChange = e => {
    this.setState({
      emailInput: e.target.value
    });
  };

  handleFullNameChange = e => {
    this.setState({
      fullNameInput: e.target.value
    });
  };

  handleZipCodeChange = e => {
    const { zipcodeInput } = this.state;
    const userZip = Number(e.target.value);
    if (!isNaN(userZip) && zipcodeInput.length <= 5) {
      this.setState({
        zipcodeInput: e.target.value
      });
    }
  };

  handleNextButton = () => {
    const {
      usernameInput,
      passwordInput,
      confirmInput,
      emailInput,
      fullNameInput,
      zipcodeInput,
      alert
    } = this.state;

    if (
      !usernameInput ||
      !passwordInput ||
      !confirmInput ||
      !emailInput ||
      !fullNameInput ||
      !zipcodeInput
    ) {
      this.setState({
        nextPressed: true
      });
    } else {
      this.setState({
        message: "Please Fill Out The Require Fields"
      });
    }
  };

  submitForm = () => {
    
    const {
      usernameInput,
      passwordInput,
      confirmInput,
      emailInput,
      fullNameInput,
      registered,
      zipcodeInput
    } = this.state;

    
    if (
      !usernameInput ||
      !passwordInput ||
      !confirmInput ||
      !emailInput ||
      !fullNameInput ||
      !zipcodeInput
    ) {
      this.setState({
        passwordInput: "",
        confirmInput: "",
        alert: true,
        message: "Please complete all required fields"
      });
      return;
    }
    if (passwordInput.length <= 7) {
      this.setState({
        passwordInput: "",
        confirmInput: "",
        alert: true,
        message: "Password length must be at least 8 characters"
      });
      return;
    }
    if (passwordInput !== confirmInput) {
      this.setState({
        passwordInput: "",
        confirmInput: "",
        alert: true,
        message: "Passwords do not match!"
      });
      return;
    }

    this.setState({
      nextPressed:true
    })
  };

  render() {
    const {
      emailInput,
      fullNameInput,
      usernameInput,
      passwordInput,
      confirmInput,
      message,
      registered,
      zipcodeInput,
      nextPressed,
      alert
    } = this.state;

    const {
      submitForm,
      handleEmailChange,
      handleFullNameChange,
      handleUsernameChange
    } = this;

    console.log(nextPressed)

    return (
      <div className="parent">
        {nextPressed ? (
            <Selection
            emailInput={emailInput}
            fullNameInput={fullNameInput}
            usernameInput={usernameInput}
            passwordInput={passwordInput}
            zipcodeInput={zipcodeInput}
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
                    name="Email"
                    placeholder="Email"
                    value={emailInput}
                    onChange={handleEmailChange}
                  />
                </label>
                <label>
                  <input
                    type="text"
                    name="Full name"
                    placeholder="Full name"
                    value={fullNameInput}
                    onChange={handleFullNameChange}
                  />
                </label>
                <label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={handleUsernameChange}
                  />
                </label>
                <label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={this.handlePasswordChange}
                  />
                </label>
                <label id="confirm">
                  <input
                    type="password"
                    name="confirm-input"
                    placeholder="Confirm Password"
                    value={confirmInput}
                    onChange={this.handleConfirmChange}
                  />
                </label>
                <label>
                  <input
                    type="text"
                    name="zip_code"
                  placeholder="Zipcode"
                    value={zipcodeInput}
                    onChange={this.handleZipCodeChange}
                  />
                </label>
                
              </form><button onClick={submitForm}>Next</button>
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