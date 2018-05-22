import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, ControlLabel, Form, HelpBlock, Button, Alert} from 'react-bootstrap';
import SportsSelectionOptions from './SportsSelectionOptions'

export default class SignupForm extends Component {
  state = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    confirmPass: "",
    zipcode: "",
    message: "",
    selectedSportsIds: []
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

  handleSportsSelection = clickedSportId => {
    let { selectedSportsIds } = this.state;
    console.log('called handleSportsSelection with:',typeof(clickedSportId), clickedSportId)

    //Find if we already have the clicked sport in our array
    //if so it means our user wants to de-select it, so remove it, else add it
    let sportIndex = selectedSportsIds.indexOf(clickedSportId)
    console.log('index of;', clickedSportId, 'is:', sportIndex)
    if(sportIndex >= 0) {
      //Removing ~ Deselecting
      selectedSportsIds.splice(sportIndex, 1)
    } else {
      //Adding
      selectedSportsIds.push(clickedSportId)
    }
    console.log(selectedSportsIds)

    this.setState({
      selectedSportsIds: selectedSportsIds
    });
  };

  validateAndSubmit = (e) => {
    e.preventDefault()
    const {
      username,
      password,
      confirmPass,
      email,
      fullname,
      zipcode,
      selectedSportsIds
    } = this.state;

    if (
      !username ||
      !password ||
      !confirmPass ||
      !email ||
      !fullname||
      !zipcode ||
      !selectedSportsIds.length
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
    const { username, password, email, fullname, zipcode, selectedSportsIds } = this.state
    const { handleSignupResponse } = this.props
    axios
    .post("/signup", {
      username,
      password,
      email,
      fullname,
      zipcode,
      sports_ids: JSON.stringify(selectedSportsIds)
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        username: "",
        password: "",
        confirmPass: "",
        email: "",
      });

      handleSignupResponse(null, res.data.user) 
    })
    .catch(err => {
      console.log("error: ", err);
      this.setState({
        username: "",
        password: "",
        confirmPass: "",
      });
      handleSignupResponse(err, null) 
    });
  };

  render() {
    const { email, fullname, username, password, confirmPass, zipcode, message, selectedSportsIds } = this.state;
    return (
      <div>
        <h1 className="form-title">Sign Up</h1>
          <Form horizontal onSubmit={this.validateAndSubmit}>
            <FormGroup controlId="email">
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='fullname'>
              <ControlLabel>Fullname:</ControlLabel>
              <FormControl
                type="text"
                name="fullname"
                placeholder="Fullname"
                value={fullname}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='username'>
              <ControlLabel>Username:</ControlLabel>
              <FormControl
                type="input"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='password'>
              <ControlLabel>Password:</ControlLabel>
              <FormControl
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='confirmPass'>
              <ControlLabel>Confirm Password:</ControlLabel>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                name="confirmPass"
                value={confirmPass}
                onChange={this.handleTextInput}
              />
            </FormGroup>
            <FormGroup controlId='zipcode'>
              <ControlLabel>Zipcode:</ControlLabel>
              <FormControl
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                value={zipcode}
                onChange={this.handleZipCodeChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Sports: </ControlLabel>
              <HelpBlock>Pick the sports you would like to play.</HelpBlock>
              <SportsSelectionOptions
                handleSportsSelection={this.handleSportsSelection}
                selectedSportsIds={selectedSportsIds}
              />
            </FormGroup>
            <div className='form-footer'>
              { message ? <Alert bsStyle='warning'>{message}</Alert> : '' }
              <Button bsStyle='success' type="submit"> Sign Up </Button>
              <p>Already have an Account <a onClick={this.props.toggleForm}>Log In</a></p>
           </div> 
          </Form>
      </div>
    )
  }
}