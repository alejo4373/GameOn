import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


class Login extends React.Component {

  state = {
    usernameInput: this.props.usernameInput || '',
    passwordInput: this.props.passwordInput || '',
    loggedIn: false,
    message: '',
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
   * @func getUser
   Retrieve the user who has logged In and set the state to that user
   This will be used to determine if the user has logged in to redirect them to their profile when the user
   hasn't logged out
   ~Kelvin
   */
  getUser = () => {
    axios.get('')
    .then(res => {
        this.setState({
            user: res.data.data[0]
        })
    })
  }
  /**
   * @func submitForm
   Submit/Post The Input to Database to retrieve User
   ~Kelvin
   */

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state;

    axios
      .post('', {
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
          usernameInput: '',
          passwordInput: '',
          message: 'username/password not found'
        });
      });

  };
  componentDidMount() {
    this.getUser()
  }
  render() {
    const { usernameInput, passwordInput, message, loggedIn, user } = this.state;
    const { submitForm } = this;
    
    if (user) {
      return <Redirect to='/user' />;
    }
    if (loggedIn) {
      return <Redirect to="/user" />;
    }

    return (
        <div id='parent'>
            <div class='login-container' >
                <div class='login-box'>
                <h1 id='title'>GameOn</h1>
                    <form onSubmit={this.submitForm}>
                    <label>
                        <input
                        type="text"
                        name="username"
                        placeholder='Username or Email'
                        value={usernameInput}
                        onChange={this.handleUsernameChange}
                        />
                    </label>

                    <label>
                        <input
                        type="password"
                        name="username"
                        placeholder='Password'
                        value={passwordInput}
                        onChange={this.handlePasswordChange}
                        />
                    </label>

                    <input type="submit" value="Log In" />
                    </form>
                    <span>{message}</span>
                </div>
                <div class='login-box'>
                Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
