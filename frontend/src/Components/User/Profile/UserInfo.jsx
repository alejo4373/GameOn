import React, { Component } from "react";
import axios from "axios";
import './UserInfo.css'
import {
  Col,
  Grid,
  Form,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";


export default class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      profile_username: "",
      profile_email: "",
      profile_fullname: "",
      profile_zipcode: "",
      message: ""
    };
  }
  handleUsernameChange = e => {
    this.setState({
      profile_username: e.target.value
    });
  };

  handleEmailChange = e => {
    this.setState({
      profile_email: e.target.value
    });
  };

  handleFullNameChange = e => {
    this.setState({
      profile_fullname: e.target.value
    });
  };

  handleZipCodeChange = e => {
    const { zipcode } = this.state;
    const userZip = Number(e.target.value);
    if (!isNaN(userZip) && zipcode.length <= 5) {
      this.setState({
        profile_zipcode: e.target.value
      });
    }
  };

  editUserInfo = () => {
   
    const {
      profile_username,
      profile_email,
      profile_fullname,
      profile_zipcode
    } = this.state;

    const { username, email, fullname, zipcode, id, picture } = this.props;
    console.log({username, email, fullname, zipcode, id})
    console.log({ profile_username,
      profile_email,
      profile_fullname,
      profile_zipcode})
    axios
      .patch("/user/edit", {
        id: id,
        username: profile_username ? profile_username : username,
        email: profile_email ? profile_email : email,
        fullname: profile_fullname ? profile_fullname : fullname,
        zipcode: profile_zipcode ? profile_zipcode : zipcode,
        picture: picture
      })
      .then(res => {
        this.setState({
          profile_username: "",
          profile_email: "",
          profile_fullname: "",
          profile_zipcode: "",
          message: "Profile Has Been Updated"
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };
  render() {
    const { username, email, fullname, zipcode } = this.props;

    const {
      profile_username,
      profile_email,
      profile_fullname,
      profile_zipcode,
    } = this.state;

    const {
      editUserInfo,
      handleEmailChange,
      handleFullNameChange,
      // eslint-disable-next-line 
      handleZipCodeChange,
      handleUsernameChange
    } = this;
    return (
      <Grid bsClass='userinfo_grid'>
            <Form horizontal onSubmit={editUserInfo}>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  Email:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    name="Email"
                    placeholder={email}
                    value={profile_email}
                    onChange={handleEmailChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Full Name:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    name="Full name"
                    placeholder={fullname}
                    value={profile_fullname}
                    onChange={handleFullNameChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Username:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    name="username"
                    placeholder={username}
                    value={profile_username}
                    onChange={handleUsernameChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Zipcode:
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    name="zip_code"
                    placeholder={zipcode}
                    value={profile_zipcode}
                    onChange={this.handleZipCodeChange}
                  />
                </Col>
              </FormGroup>
              <Button id="loginSubmitButton" type="submit">
                Update
              </Button>

              {/* <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                </Col>
              </FormGroup> */}
        </Form>
      </Grid>
    );
  }
}