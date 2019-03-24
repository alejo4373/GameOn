import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_USER, SIGNUP_USER } from "../../store/actionTypes";
import LoginForm from "./AuthForms/LoginForm";
import SignupForm from "./AuthForms/SignupForm";

class AuthForms extends Component {
  renderLoginForm = () => {
    const { loginUser, msg } = this.props
    return <LoginForm loginUser={loginUser} msg={msg}/>
  }

  renderSignupForm = () => {
    const { signupUser, msg } = this.props
    return <SignupForm signupUser={signupUser} msg={msg}/>
  }

  render() {
    const { loggedIn, user } = this.props;

    if (user || loggedIn) {
      return <Redirect to="/user/dashboard" />;
    }

    return (
      <div className="form-container">
        <Switch>
          <Route path='/login' render={this.renderLoginForm} />
          <Route path='/signup' render={this.renderSignupForm} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials) => {
      dispatch({
        type: LOGIN_USER,
        payload: credentials
      })
    },
    signupUser: (credentials) => {
      dispatch({
        type: SIGNUP_USER,
        payload: credentials
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForms);
