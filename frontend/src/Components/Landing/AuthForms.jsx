import React, { Component } from "react";
import { Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import LoginForm from "./AuthForms/LoginForm";
import SignupForm from "./AuthForms/SignupForm";
import { connect } from "react-redux";
import { LOGIN_USER } from "../../store/actionTypes";

class AuthForms extends Component {
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
        loginUser={this.props.loginUser}
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

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials) => {
      console.log('loginUser Called');
      dispatch({
        type: LOGIN_USER,
        payload: credentials
      })
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    otherProp: 'blah'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForms);
