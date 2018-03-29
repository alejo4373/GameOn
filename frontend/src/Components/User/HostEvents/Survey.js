import React, { Component } from 'react';
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

export default class Survey extends Component {
  render() {
    return (
      <div className='survery-parent'>
       
            <h2>Did You Enjoy The Game</h2>
            <Slider
                defaultValue={miles}
                min={1}
                max={8}
                handle={this.handle}
                onChange={props =>
                  this.getUserCurrentLocation(this.getAllHostedEvents, props, this.state.sportID)
                }
              />
            <h2>Who Won The Game</h2>
            {/*Dropdown list*/}
            <h2>Would You Play With this Team Or Host Again?</h2>
            {/*Checkboxes Yes Or No*/}
      </div>
    )
  }
};
