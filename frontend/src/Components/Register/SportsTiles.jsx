import React, { Component } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./SportsTile.css";

export default class SportTiles extends Component {
  state = {
    sports: []
  };

  getAllSports = () => {
    axios

    .get('/sport/all')
    .then(res => {
      this.setState({
        sports: res.data.sports
      })
      .catch(err => console.log("Error Getting All Sports:", err));
  };

  componentWillMount() {
    this.getAllSports();
  }

  render() {
    const { handleNextButton } = this.props;
    const { sports } = this.state;
    console.log("sports:", sports);
    return (
      <div id="sportsTile-container">
        <p id="select-sport-title"> Select A Sport </p>
        <p>(Minimum: 1 Selection)</p>

        <div id="container-for-all-images">
          {sports.map(s => (
            <div id="image_container">
              {console.log(s.name, s)}
              <img
                src={`/images/${s.name}.jpg`}
                width="100%"
                height="100%"
                id={s.id}
                name={s.name}
                alt=""
              />
              <div id="sportsName-container"><h4 id="sportsName">{s.name}</h4></div>
            </div>
          ))}
        </div>
        <form>
          <input
            className="input"
            id="sportsTile-submit"
            type="submit"
            value="Next"
            onClick={handleNextButton}
          />
        </form>

      </div>
    );
  }
}
