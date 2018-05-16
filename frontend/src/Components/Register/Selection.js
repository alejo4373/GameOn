import React, { Component } from "react";

import Skills from "./Skills.js";
import SportTiles from "./SportsTiles.jsx";

class Selection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSports: this.props.selectedSports
    }
  }

  handlePreviousButton = () => {
    const { selectedSports } = this.state;
    if (selectedSports.length) {
      this.setState({
        nextPressed: false
      });
    }
  };

  render() {
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

    return (
      <div>
          <SportTiles
            handleSelectionChanges={handleSelectionChanges}
            handleNextButton={handleNextButton}
          />
      </div>
    );
  }
}

export default Selection;
