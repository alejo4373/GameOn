import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap';

export default class SignupForm extends Component {
  state = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    confirmPass: "",
    zipcode: "",
    message: "",
    selectedSports: []
  }

  handleTextInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleZipCodeChange = e => {
    const { zipcode } = this.state;
    const userZip = Number(e.target.value);
    if (!isNaN(userZip) && zipcode.length <= 5) {
      this.setState({
        zipcode: e.target.value
      });
    }
  };

  handleSportsSelection = e => {
    let { selectedSports } = this.state;
    const sportName = e.target.name;
    const sportId = e.target.id
    console.log('sportselected:', sportId, sportName)

    //Find if we already have the clicked sport in our array
    //if so it means our user wants to de-select it, so remove it, else add it
    let sportIndex = selectedSports.findIndex(sport => { 
      return sport.sport_id === sportId 
    })

    if(sportIndex) {
      //Removing ~ Deselecting
      selectedSports.splice(sportIndex, 1)
    } else {
      //Adding
      selectedSports.push({sport_id: sportId, sport_name: sportName})
    }

    this.setState({
      selectedSports: selectedSports
    });
  };

  validateAndSubmit = () => {
    const {
      username,
      password,
      confirmPass,
      email,
      fullname,
      zipcode,
      selectedSports
    } = this.state;

    if (
      !username ||
      !password ||
      !confirmPass ||
      !email ||
      !fullname||
      !zipcode ||
      !selectedSports.length
    ) {
      return this.setState({
        password: "",
        confirmPass: "",
        alert: true,
        message: "Please complete all required fields"
      });
    }
    if (password.length < 5) {
      return this.setState({
        password: "",
        confirmPass: "",
        alert: true,
        message: "Password length must be at least 5 characters"
      });
    }
    if (password!== confirmPass) {
      return this.setState({
        passwordPass: "",
        confirmPass: "",
        alert: true,
        message: "Passwords do not match!"
      });
    }

  this.handleSubmit();
 
  };

  handleSubmit = () => {
    const { username, password, email, fullname, zipcode, selectedSports } = this.state
    axios
    .post("/signup", {
      username,
      password,
      email,
      fullname,
      zipcode,
      sports: JSON.stringify(selectedSports)
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        registered: true,
        username: "",
        password: "",
        confirmPass: "",
        submitted: true,
        email: "",
        message: `Welcome to the site ${this.state.usernameInput}`
      });
    })
    .catch(err => {
      console.log("error: ", err);
      this.setState({
        usernameInput: "",
        passwordInput: "",
        confirmInput: "",
        emailInput: "",
        message: "Error inserting user"
      });
    });
  };

  render() {
    const { email, fullname, username, password, confirmPass, zipcode, message } = this.state;
    return (
      <div>
        <p id="login">Log In</p>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              <Col sm={1}>
                <ControlLabel>Email:</ControlLabel>
              </Col>
              <Col sm={11}>
                <FormControl
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleTextInput}
                />
              </Col>
            </FormGroup>
            <input
              type="text"
              name="fullname"
              placeholder="First and Last Name"
              value={fullname}
              onChange={this.handleTextInput}
            />
            <input
              type="input"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleTextInput}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleTextInput}
            />
            <br/>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              value={confirmPass}
              onChange={this.handleTextInput}
            />
            <br />
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={zipcode}
              onChange={this.handleZipCodeChange}
            />
           <p>{message}</p>
           <input id="login-submit" type="submit" value="Submit" />
           <p>Already have an Account <a onClick={this.props.toggleForm}>Log In</a></p>
          </Form>
      </div>
    )
  }
}