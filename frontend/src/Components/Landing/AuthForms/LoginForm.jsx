import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    this.props.setAuthMessage('');
  }

  handleTextInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validateAndSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state;

    if (!username || !password) {
      return this.props.setAuthMessage("Please complete all fields.");
    }
    this.props.loginUser(this.state);
  };

  handleDemoLogin = () => {
    const credentials = {
        username: 'demoUser',
        password: 'demo'
    }
    this.props.loginUser(credentials)
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1 className="form-title">Log In</h1>
          <Form horizontal onSubmit={this.validateAndSubmit}>
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
            <div className='form-footer'>
              {this.props.msg ? <Alert bsStyle='danger'> {this.props.msg} </Alert> : null}
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
