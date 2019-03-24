import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  handleDemoLogin = () => {
    axios
      .post("/login", {
        username: 'demoUser',
        password: 'demo'
      })
      .then(res => {
        this.props.handleLoginResponse(null, res.data)
      })
      .catch(err => {
        this.props.handleLoginResponse(err, null)
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state)
    // axios
    //   .post("/login", {
    //     username: username,
    //     password: password
    //   })
    //   .then(res => {
    //     this.props.handleLoginResponse(null, res.data)
    //   })
    //   .catch(err => {
    //     this.props.handleLoginResponse(err, null)
    //   });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1 className="form-title">Log In</h1>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <div className='login-buttons'>
              <Button bsStyle='success' type="submit">Log In</Button>
              {' '}
              <Button bsStyle='info' onClick={this.handleDemoLogin}>Demo</Button>
            </div>
            <p>Don't have an Account <Link to='/signup'>Sign Up</Link></p>
          </Form>
      </div>
    )
  }
}
