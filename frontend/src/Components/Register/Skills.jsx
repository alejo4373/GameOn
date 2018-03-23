import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

//Bootstrap Elements ~Kelvin
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import ReactDOM from "react-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
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

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skillValue: 0,
      userSkill: "",
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
    axios
      .post("/signup", {
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        fullname: fullNameInput,
        zipcode: zipcodeInput,
        sports: JSON.stringify([{ sport_id: "2", proficiency: "2" }])
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

  setSkills = props => {
    const { userSkill } = this.state;

    if (props === 1) {
      this.setState({
        userSkill: "Beginner"
      });
    } else if (props === 2) {
      this.setState({
        userSkill: "Intermediate"
      });
    } else if (props === 3) {
      this.setState({
        userSkill: "Expert"
      });
    }
  };

  render() {
    const { sportSelected, sliderValue, userSkill, submitted } = this.state;

    const { handlePreviousButton, selectedSports } = this.props;

    if (submitted) {
      return <Redirect to="/user" />;
    }

    console.log("userSkills:", userSkill);

    const wrapperStyle = { width: 500, margin: 50 };
    return (
      <Grid>
        <div id="slider_container">
          {selectedSports.map(s => {
            return (
              <div style={wrapperStyle}>
                <span>{s}</span>
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
