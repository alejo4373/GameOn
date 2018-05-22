import React, { Component } from 'react';
import axios from 'axios';

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleTextInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit= e => {
    e.preventDefault();
    const { username, password } = this.state;

    axios
      .post("/login", {
        username: username,
        password: password
      })
      .then(res => {
        this.props.handleLoginResponse(null, res.data)
      })
      .catch(err => {
        this.props.handleLoginResponse(err, null)
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1 className="form-title">Log In</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              id="login-input"
              type="input"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleTextInput}
            />
            <br />
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleTextInput}
            />
            <br />
            <input id="login-submit" type="submit" value="Submit" />
            <p>Don't have an Account <a onClick={this.props.toggleForm}>Sign Up</a></p>
          </form>
      </div>
    )
  }
}