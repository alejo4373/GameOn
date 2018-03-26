import React, { Component } from "react";
import "./Login.css";
import {
  Grid,
  Jumbotron,
  Form,
  Button,
  PageHeader,
  FormGroup,
  ControlLabel,
  FormControl,
  Carousel
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";

export default class Login extends Component {
  state = {
    usernameInput: this.props.usernameInput || "",
    passwordInput: this.props.passwordInput || "",
    loggedIn: false,
    message: "",
    user: null
  };

  /**
       * @func handleUserNameChange
       Handles the users value and Set the State to that value
       ~Kelvin
       */

  handleUsernameChange = e => {
    this.setState({
      usernameInput: e.target.value
    });
  };
  /**
       * @func handlePasswordChange
       Handles the users value/password and Set the State to that value
       ~Kelvin
       */

  handlePasswordChange = e => {
    this.setState({
      passwordInput: e.target.value
    });
  };
  /**
       * @func submitForm
       Submit/Post The Input to Database to retrieve User
       ~Kelvin
       */

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state;

    axios
      .post("/login", {
        username: usernameInput,
        password: passwordInput
      })
      .then(res => {
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "username/password not found"
        });
      });
  };

  render() {
    const {
      usernameInput,
      passwordInput,
      message,
      loggedIn,
      user
    } = this.state;
    const { submitForm } = this;

    if (user) {
      return <Redirect to="/user/dashboard" />;
    }
    if (loggedIn) {
      return <Redirect to="/user/dashboard" />;
    }

    return (
      <div className="login_container">
        <div className="pageHeader">
          <h1 id="login_title">
            <strong>Game On!</strong> <br />
          </h1>
        </div>
        <Carousel controls={false} interval={4000} indicators={false}>
          <Carousel.Item>
            <img src="/images/soccer-background.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/football-background.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/basketball-background.jpg" />
          </Carousel.Item>
        </Carousel>
        <a id="lets_play_link" href="#form_container">
          <h2>Let's Play</h2>
        </a>
        <div id="form_container">
          <p>
            Log In
          </p>
          <div id="form_div">
            <form onSubmit={this.submitForm}>
              <input
                type="input"
                placeholder="Username or E-mail"
                name="username"
                value={usernameInput}
                onChange={this.handleUsernameChange}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                name="username"
                value={passwordInput}
                onChange={this.handlePasswordChange}
              />
              <br/>
              <input id="loginSubmitButton" type="submit" value="Submit"></input>
              <p>
                Don't have an account? <Link id="signup" to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
