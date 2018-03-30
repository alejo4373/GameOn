import React, { Component } from "react";

import {
  FormGroup,
  Checkbox
} from "react-bootstrap";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

const Handle = Slider.Handle;

export default class Survey extends Component {
  handle = props => {
    const { value, dragging, index, ...restProps } = props;

    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
        show={value}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };
  render() {
    return (
      <div className="survey-parent">
        <h2>Did You Enjoy The Game</h2>
        <div style={{maxWidth: "300px", marginLeft: '38%', minWidth:"400px"}}>
        <Slider
          defaultValue={1}
          min={1}
          max={5}
          handle={this.handle}
        //   onChange={}
        />
        </div>
        <h2>Who Won The Game</h2>
        <FormGroup>
          <Checkbox inline>1</Checkbox> 
          <Checkbox inline>2</Checkbox>
          <Checkbox inline>3</Checkbox>
        </FormGroup>
        <h2>Would You Play With this Team Or Host Again?</h2>
        <FormGroup>
          <Checkbox inline>Absolutely</Checkbox> 
          <Checkbox inline>No</Checkbox>
          <Checkbox inline>Maybe</Checkbox>
        </FormGroup>
      </div>
    );
  }
}
