import React, { Component } from "react";

import Skills from "./Skills.js";
import SportTiles from "./SportsTiles.jsx";

class Selection extends Component {
  state = {
    selectedSports: [],
    nextPressed: false,
    selected:[]
  };

  /*
  @handleSelectionChanges
  This will handle all the sports the user selects and set the state in comparison to the user's selection
  */
  handleSelectionChanges = e => {
    const { selectedSports, selected } = this.state;
    const sport = e.target.name;
    const id = e.target.id
    console.log('sportselected:', id)
   
    if (!selected.includes(sport) && sport !== undefined) {
      this.setState({
        selected: [...selected, sport],
        selectedSports: [...selectedSports, {sport,id}],
      });
    }
    
    this.state.selectedSports.map(s => {
      // if (sport === s ) {
      //   console.log("blue")
      // } 
      console.log(s)
    })
    
  };

  /*
  @handleNextButton
  Once The User is done selecting this will set the nextPressed state to true which allow the user to 
  move on to the next registration form
  */

  handleNextButton = () => {
    const { selectedSports } = this.state;
    if (selectedSports.length) {
      this.setState({
        nextPressed: true
      });
    }
  };

  handlePreviousButton = () => {
    const { selectedSports } = this.state;
    if (selectedSports.length) {
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

    const {
      emailInput,
      fullNameInput,
      usernameInput,
      passwordInput,
      zipcodeInput
    } = this.props

    console.log(selectedSports);

    return (
      <div>
        {nextPressed ? (
          <Skills
            selectedSports={selectedSports}
            handlePreviousButton={handlePreviousButton}
            emailInput={emailInput}
            fullNameInput={fullNameInput}
            usernameInput={usernameInput}
            passwordInput={passwordInput}
            zipcodeInput={zipcodeInput}
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
