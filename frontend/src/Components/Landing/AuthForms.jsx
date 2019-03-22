import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import LoginForm from "./AuthForms/LoginForm";
import SignupForm from "./AuthForms/SignupForm";

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
      <div className="form-container">
        <Switch>
          <Route path='/login' render={this.renderLoginForm} />
          <Route path='/signup' render={this.renderSignupForm} />
        </Switch>
      {this.handleAlert()}
      </div>
    );
  }
}
