import React, { Component } from "react";
import "./Form.css";
// import axios from "axios";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router";
import { Carousel } from "react-bootstrap";
import Selection from "./Selection";

export default class Registration extends Component {
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

  submitForm = e => {
    e.preventDefault();
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
    if (passwordInput.length <= 4) {
      this.setState({
        passwordInput: "",
        confirmInput: "",
        alert: true,
        message: "Password length must be at least 5 characters"
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
      nextPressed: true
    });
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

    return (
      <div>
        <div className="pageHeader" />
        <h1 id="login_title">
          <strong>Game On!</strong> <br />
        </h1>
        <div id="image-containter">
          <img
            id="form-image"
            src="/images/form-page-basketball-background.jpg"
            align="left"
          />
        
        { true ? (
          <div>
            <Selection
              emailInput={emailInput}
              fullNameInput={fullNameInput}
              usernameInput={usernameInput}
              passwordInput={passwordInput}
              zipcodeInput={zipcodeInput}
            />
          </div>
        ) : (
          <div id="container">
            <div id="signup-form-container">
              <p id="signup-title">
                <strong>Sign Up To Play, Compete, and Rank-Up</strong>
              </p>
              <div id="form-container">
                <form onSubmit={submitForm}>
                  <input
                    class="input"
                    id="login-input"
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={emailInput}
                    onChange={handleEmailChange}
                  />
                  <br />
                  <input
                    class="input"
                    id="login-input"
                    type="text"
                    name="Full name"
                    placeholder="Full name"
                    value={fullNameInput}
                    onChange={handleFullNameChange}
                  />
                  <br />
                  <input
                    class="input"
                    id="login-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={handleUsernameChange}
                  />
                  <br />
                  <input
                    class="input"
                    id="login-input"
                    type="text"
                    name="zip_code"
                    placeholder="Zipcode"
                    value={zipcodeInput}
                    onChange={this.handleZipCodeChange}
                  />
                  <br />
                  <input
                    class="input"
                    id="login-password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={this.handlePasswordChange}
                  />
                  <br />
                  <input
                    class="input"
                    id="login-password"
                    type="password"
                    name="confirm-input"
                    placeholder="Confirm Password"
                    value={confirmInput}
                    onChange={this.handleConfirmChange}
                  />
                  <br />
                  <input
                    class="input"
                    id="login-submit"
                    type="submit"
                    value="Sign Up"
                  />
                  <p>{message}</p>
                  <p id="question">
                    Have an account? <Link to="/login">Log In</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  }
}
