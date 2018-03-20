import React, { Component } from "react";



class SportTiles extends Component {
  state = {
    sports: [
      "Soccer",
      "Football",
      "Handball",
      "Tennis",
      "Basketball",
      "Volleyball"
    ]
  };
  render() {
    const { handleSelectionChanges, handleNextButton, color } = this.props;
    const { sports } = this.state;
    return (
      <div className="parent">
        <span className="sport_name">
          <h1>Select A Sport (Minimum 1 Selection)</h1>
        </span>
        <div id="selection_container">
          {sports.map(s => (
            <div
              className="sport_selection"
              id={s}
              onClick={handleSelectionChanges}
            >
              <span className="sport_name">
                <h4>{s}</h4>
              </span>
              <img src={`/images/${s}.png`} width={"200px"} height={'200px'}id={s} alt="" />
            </div>
          ))}
        </div>
        <button onClick={handleNextButton}>Next</button>
      </div>
    );
  }
}

export default SportTiles;

