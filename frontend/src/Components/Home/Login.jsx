import React, { Component } from "react";
import "./Login.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default class Login extends Component {
  state = {
    usernameInput: this.props.usernameInput || "",
    passwordInput: this.props.passwordInput || "",
    loggedIn: false,
    message: "",
    user: null,
    renderLoginForm: true //When false Signup form will render
  };

  /**
       * @func handleUserNameChange
       Handles the users value and Set the State to that value
       ~Kelvin
       */

  handleLoginResponse = (err, user) => {
    if(err) {
      this.setState({
        message: 'Username or Password Not Found'
      })
    } else {
      this.setState({
        user: user,
        loggedIn: true
      })
    }
  }

  toggleForm = (e) => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        renderLoginForm: !prevState.renderLoginForm
      }
    })
  }

  render() {
    const {
      usernameInput,
      passwordInput,
      message,
      loggedIn,
      renderLoginForm,
      user
    } = this.state;

    if (user || loggedIn) {
      return <Redirect to="/user/dashboard" />;
    }

    return (
      <div className="login_container">
        <div className="pageHeader" />
        <h1 id="login_title">
          <strong>Game On!</strong> <br />
        </h1>
        <Carousel
          controls={false}
          interval={4000}
          indicators={false}
          pauseOnHover={false}
        >
          <Carousel.Item>
            <img
              src="/images/soccer-background.png"
              height="100vh"
              alt=''
            />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/football-background.png" height="100vh" alt='' />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/basketball-for-slide-show.jpg" height="100vh" alt='' />
          </Carousel.Item>
        </Carousel>
        <div id="link-div">
          <a id="lets_play_link" href="#form_container">
            <h2 id="login-subtitle">Let's Play</h2>
            <img id="arrow" src="/images/homePage-arrow.png" alt="" />
          </a>
        </div>
        <div className="form_container">
          {
            renderLoginForm ? 
              <LoginForm handleLoginResponse={this.handleLoginResponse} toggleForm={this.toggleForm}/>
            : 
              <SignupForm handleSignupResponse={this.handleLoginResponse} toggleForm={this.toggleForm}/>
          }
        </div>
        {message}
      </div>
    );
  }
}
