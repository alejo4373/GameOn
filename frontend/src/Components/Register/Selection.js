import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Skills from "./Skills";
import SportTiles from "./SportTiles";

class Selection extends Component {
  state = {
    selectedSports: [],
    nextPressed: false,
    color: 'none'
  };

  /*
  @handleSelectionChanges
  This will handle all the sports the user selects and set the state in comparison to the user's selection
  */
  handleSelectionChanges = e => {
    const { selectedSports } = this.state;
    const sport = e.target.id;
    if (!selectedSports.includes(sport)) {
      this.setState({
        selectedSports: [...selectedSports, sport],
        color: 'green'
      });
    }
  };

  /*
  @handleNextButton
  Once The User is done selecting this will set the nextPressed state to true which allow the user to 
  move on to the next registration form
  */

  handleNextButton = () => {
    const { selectedSports } = this.state;
    if (selectedSports[0]) {
      this.setState({
        nextPressed: true
      });
    }
  };

  handlePreviousButton = () => {
    const { selectedSports } = this.state;
    if (selectedSports[0]) {
      this.setState({
        nextPressed: false
      });
    }
  };

  render() {
    const { selectedSports, nextPressed, color } = this.state;
    const {
      handleSelectionChanges,
      handleNextButton,
      handlePreviousButton
    } = this;

    console.log(selectedSports);

    return (
      <div>
        {nextPressed ? (
          <Skills
            selectedSports={selectedSports}
            handlePreviousButton={handlePreviousButton}
          />
        ) : (
          <SportTiles
            handleSelectionChanges={handleSelectionChanges}
            handleNextButton={handleNextButton}
            color={color}
          />
        )}
      </div>
    );
  }
}

export default Selection;
