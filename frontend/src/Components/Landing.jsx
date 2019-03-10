import React, { Component } from "react";
import "../CSS/Landing.css";
import { Carousel } from "react-bootstrap";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import LoginForm from "./Home/LoginForm";
import SignupForm from "./Home/SignupForm";

export default class Landing extends Component {
  state = {
    loggedIn: false,
    message: "",
    user: null,
  };

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

  handleSignupResponse = (err, user) => {
    if(err) {
      this.setState({
        message: 'An error occurred while trying to sign up'
      })
    } else {
      this.setState({
        user: user,
        loggedIn: true
      })
    }
  }

  handleAlert = () => {
    const { message } = this.state
    if(message) {
      return(
        <Alert bsStyle='danger'>
          {message}
        </Alert>
      )
    }
  }

  toggleForm = (e) => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        renderLoginForm: !prevState.renderLoginForm,
        message: ''
      }
    })
  }

  renderLoginForm = () => {
    return (
      <LoginForm 
        handleLoginResponse={this.handleLoginResponse} 
        toggleForm={this.toggleForm}
      />
    )
  }

  renderSignupForm = () => {
    return (
      <SignupForm 
        handleSignupResponse={this.handleSignupResponse} 
        toggleForm={this.toggleForm}
      />
    )
  }

  render() {
    const {
      loggedIn,
      user
    } = this.state;

    if (user || loggedIn) {
      return <Redirect to="/user/dashboard" />;
    }

    return (
      <div className="landing">
        <div className="header">
          <nav>
            <div className="global-logo">
              <Link to="/user/dashboard"><img id="logo" src='/images/gameon-logo.png' alt='gameon-logo'/></Link>
            </div>
            <div className="auth-nav">
              <ul>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  or
                </li>
                <li>
                  <Link to='/signup'>Signup</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
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
        <div className="form-container">
          <Switch>
            <Route path='/login' render={this.renderLoginForm} />
            <Route path='/signup' render={this.renderSignupForm} />
          </Switch>
          {this.handleAlert()}
        </div>
      </div>
    );
  }
}
