import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_USER, SIGNUP_USER, SET_AUTH_MESSAGE } from "../../store/actionTypes";
import LoginForm from "./AuthForms/LoginForm";
import SignupForm from "./AuthForms/SignupForm";

class AuthForms extends Component {
  renderLoginForm = () => {
    const { loginUser, msg, setAuthMessage } = this.props
    return (
      <LoginForm
        loginUser={loginUser}
        setAuthMessage={setAuthMessage}
        msg={msg}
      />
    )
  }

  renderSignupForm = () => {
    const { signupUser, msg, setAuthMessage } = this.props
    return (
      <SignupForm 
        signupUser={signupUser} 
        setAuthMessage={setAuthMessage}
        msg={msg}
      />
    )
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
    },
    setAuthMessage: (msg) => {
      dispatch({
        type: SET_AUTH_MESSAGE,
        payload: msg
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
