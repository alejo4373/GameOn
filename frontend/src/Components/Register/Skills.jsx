import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import {
  Col,
  Grid,
  Jumbotron,
  Form,
  Button,
  PageHeader,
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Row,
  Well
} from "react-bootstrap";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

const Handle = Slider.Handle;

class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skillValue: [],
      sports_skills: [],
      submitted: false
    };
  }

  submitForm = () => {
    const {
      emailInput,
      fullNameInput,
      usernameInput,
      passwordInput,
      zipcodeInput
    } = this.props;

    const { sports_skills } = this.state;

    axios
      .post("/signup", {
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        fullname: fullNameInput,
        zipcode: zipcodeInput,
        sports: JSON.stringify(sports_skills)
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          registered: true,
          usernameInput: "",
          passwordInput: "",
          confirmInput: "",
          submitted: true,
          emailInput: "",
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

  handle = props => {
    const { value, dragging, index, ...restProps } = props;

    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  setSkills = (value, sport) => {
    const { sports_skills, skillValue } = this.state;
    const id = sport.id;
    if (value === 1) {
      if (!skillValue.includes(id)) {
        this.setState({
          skillValue: [...skillValue, id],
          sports_skills: [
            ...sports_skills,
            { sport_id: id, proficiency: value }
          ]
        });
      } else {
        sports_skills.forEach(s => {
          if (s.sport_id === id) {
            s.proficiency = value;
            return;
          }
        });
      }
    } else if (value === 2) {
      if (!skillValue.includes(id)) {
        this.setState({
          skillValue: [...skillValue, id],
          sports_skills: [
            ...sports_skills,
            { sport_id: id, proficiency: value }
          ]
        });
      } else {
          sports_skills.forEach(s => {
            if (s.sport_id === id) {
              s.proficiency = value;
              return;
            }
          });
      }
    } else if (value === 3) {
      if (!skillValue.includes(id)) {
        this.setState({
          skillValue: [...skillValue, id],
          sports_skills: [
            ...sports_skills,
            { sport_id: id, proficiency: value }
          ]
        });
      } else {
          sports_skills.forEach(s => {
            if (s.sport_id === id) {
              s.proficiency = value;
              return;
            }
          }); 
      }
    }
  };

  render() {
    const {  sports_skills, submitted } = this.state;

    const { handlePreviousButton, selectedSports } = this.props;

    if (submitted) {
      return <Redirect to="/user/dashboard" />;
    }

    console.log("userSkills:", sports_skills);

    const wrapperStyle = { width: 500, margin: 50 };
    return (
      <Grid>
        <div id="slider_container">
          {selectedSports.map(s => {
            return (
              <div style={wrapperStyle}>
                <span>{s.name}</span>
                <Slider
                  defaultValue={0}
                  min={1}
                  max={3}
                  handle={this.handle}
                  onChange={this.setSkills}
                />
                <span className="skills">Beginner</span>
                <span className="skills">Intermediate</span>
                <span className="skills">Expert</span>
              </div>
            );
          })}
          <button onClick={handlePreviousButton}>Previous</button>
          <button onClick={this.submitForm}>Finish</button>
        </div>
      </Grid>
    );
  }
}

export default Skills;
