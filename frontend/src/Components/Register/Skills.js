import React, { Component } from "react";
import axios from "axios";

//Images for Each Sport ~Kelvin
import basketball from "../../Images/baskteball.png";
import football from "../../Images/football.png";
import soccer from "../../Images/soccer.png";
import tennis from "../../Images/tennis.png";
import handball from "../../Images/handball.png";
import volleyball from "../../Images/volleyball.gif";

//Bootstrap Elements ~Kelvin
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import ReactDOM from "react-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;



class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skillValue: 0,
      userSkill: ""
    };
  }

  //   getUsersInfo = () => {};

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

    if (props > 0 && props <= 25) {
      this.setState({
        userSkill: "Beginner"
      });
    } else if (props > 25 && props <= 50) {
      this.setState({
        userSkill: "Intermediate"
      });
    } else if (props > 50) {
      this.setState({
        userSkill: "Expert"
      });
    }
  };

  render() {
    const {
      sportSelected,
      sliderValue,
      userSkill,
    } = this.state;

    const {
        handlePreviousButton,
        selectedSports
    } = this.props

    console.log("userSkills:", userSkill);

   const wrapperStyle = { width: 400, margin: 50 };
    return (
      <div id="slider_container">
        {selectedSports.map(s => {
          return (
            <div style={wrapperStyle}>
              <span>{s}</span>
              <Slider
                defaultValue={0}
                min={0}
                max={75}
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
        <button>Finish</button>
      </div>
    );
  }
}

export default Skills;
