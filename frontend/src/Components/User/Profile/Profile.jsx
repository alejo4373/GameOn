import React, { Component } from "react";
import axios from "axios";

import UserInfo from "./UserInfo";
import ProfileSports from "./ProfileSports";

import {
  Modal,
  Button,
  Col,
  Grid,
  Jumbotron,
  Form,
  PageHeader,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
  console.log("FieldGroupProps:", props)
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Profile extends Component {
  state = {
    user: [],
    enable: false,
    show: false,
    photo: "",
    message: ""
  };

  getUserInfo = () => {
    axios
      .get("/user/getinfo")
      .then(res => {
        console.log(res.data.user);
        this.setState({
          user: res.data.user
        });
      })
      .catch(err => console.log("Failed To Fetch User:", err));
  };

  handleDisplayInfo = e => {
    if (e.target.id === "profile_personal_info") {
      this.setState({
        enable: false
      });
    } else if (e.target.id === "profile_sport_info")
      this.setState({
        enable: true
      });
  };

  handleURLChange = e => {
    this.setState({
      photo: e.target.value
    });
  };

  submitProfilePicture = () => {
    const { user, photo } = this.state;

    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (regex.test(photo)) {
      axios
        .patch("/user/edit", {
          id: user.id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          zipcode: user.zip_code,
          picture: user.profile_pic ? photo : user.profile_pic
        })
        .then(() => {
          this.setState({
            show: false,
            message: "",
            photo:''
          });
        })
        .catch(err => console.log("Failed To Fetch User:", err));
    } else {
      this.setState({
        message: "Wrong Input Please Enter A URL",
        photo:''
      });
      setTimeout(() => {
        this.setState({
          message: ""
        });
      }, 1500);
    }
  };

  componentWillMount() {
    this.getUserInfo();
  }

  render() {
    const {
      handleEditProfile,
      handleDisplayInfo,
      handleURLChange,
      submitProfilePicture
    } = this;
    const { user, enable, show, photo, message } = this.state;

    return (
        <div className="profile_parent">
        <Modal show={show} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Upload Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              Submit URL
              <FormGroup>
                <FormControl
                  type="text"
                  name="photo"
                  value={photo}
                  onChange={handleURLChange}
                  bsSize={"lg"}
                />
              </FormGroup>
              <FieldGroup
                id="formControlsFile"
                type="file"
                label="File"
                onChange={(e) =>this.setState({ photo: e.target.files.file})}
              />
              {message}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={submitProfilePicture}>Submit</Button>
            <Button onClick={() => this.setState({ show: false, message: "" })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
          <div id="profile_menu">
            <div id="profile_header">
              <img
                src={user.profile_pic}
                id="profile_photo"
                onClick={() => this.setState({ show: true })}
              />
              <div id="profile_username">{user.username}</div>
            </div>
            <div id="profile_personal_info" onClick={handleDisplayInfo}>
              Personal Info
            </div>
            <div id="profile_sport_info" onClick={handleDisplayInfo}>
              Your Sports
            </div>
          </div>

          <div id="profile_info_container">
            {!enable ? (
              <UserInfo
                id={user.id}
                username={user.username}
                email={user.email}
                fullname={user.fullname}
                zipcode={user.zip_code}
              />
            ) : (
              <ProfileSports sports={user.sports} />
            )}
          </div>
        </div>
    );
  }
}

export default Profile;

/**
 * <button id="edit_Overview_button" onClick={handleEditProfile}>
          Edit Profile
        </button>
 */
