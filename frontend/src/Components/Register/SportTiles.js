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

/* 
 <div id="selection_container">
          <div
            className="sport_selection"
            id="soccer"
            onClick={handleSelectionChanges}
            style={{backgroundColor: color}}
          >
            <span className="sport_name">
              <h4>Soccer</h4>
            </span>
            <img src={soccer} width={"200px"} id="soccer" alt="" />
          </div>
          <div
            className="sport_selection"
            id="football"
            onClick={handleSelectionChanges}
          >
            <span className="sport_name">
              <h4>Football</h4>
            </span>
            <img src={football} width={"200px"} id="football" alt="" />
          </div>
          <div
            className="sport_selection"
            id="handball"
            onClick={handleSelectionChanges}
          >
            <span className="sport_name">
              <h4>Handball</h4>
            </span>
            <img src={handball} width={"200px"} id="handball" alt="" />
          </div>
          <div
            className="sport_selection "
            id="tennis"
            onClick={handleSelectionChanges}
          >
            <span className="sport_name">
              <h4>Tennis</h4>
            </span>
            <img src={tennis} width={"200px"} id="tennis" alt="" />
          </div>
          <div
            className="sport_selection"
            id="basketball"
            onClick={handleSelectionChanges}
          >
            <span className="sport_name">
              <h4>Basketball</h4>
            </span>
            <img src={basketball} width={"200px"} id="basketball" alt="" />
          </div>
          <div
            className="sport_selection"
            id="volleyball"
            onClick={handleSelectionChanges}
          >
            <span className="sport_name">
              <h4>Volleyball</h4>
            </span>
            <img src={volleyball} width={"150px"} id="volleyball" alt="" />
          </div>
        </div>
*/
