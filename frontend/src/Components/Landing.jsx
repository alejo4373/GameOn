import React, { Component } from "react";
import "./Landing.css";
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
        <div className="top">
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
        <div className="bottom">
          <Carousel
            controls={false}
            // interval={null}
            indicators={false}
            pauseOnHover={false}
          >
            <Carousel.Item>
              <img src="/images/slides/soccer.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/slides/football.jpg" alt='' />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/slides/basketball.jpg" alt='' />
            </Carousel.Item>
          </Carousel>
           <div className="overlay">
             <div className="form-container">
               <Switch>
                 <Route path='/login' render={this.renderLoginForm} />
                 <Route path='/signup' render={this.renderSignupForm} />
               </Switch>
               {this.handleAlert()}
             </div>
           </div>
        </div>
      </div>
    );
  }
}
