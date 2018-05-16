import React, { Component } from "react";
import axios from "axios";
import "./SportsTile.css";

export default class SportTiles extends Component {
  state = {
    allSports: []
  };

  getAllSports = () => {
    axios
    .get('/sport/all')
    .then(res => {
      this.setState({
        allSports: res.data.sports
      })
   }).catch(err => console.log("Error Getting All Sports:", err));
  }

  componentWillMount() {
    this.getAllSports();
  }

  render() {
    const { handleSportsSelection, submitForm } = this.props;
    const {  allSports } = this.state;
    return (
      <div id="sportsTile-container">
        <div className="pageHeader" />
        <h1 id="login_title">
          <strong>Game On!</strong> <br />
        </h1>

        <div id="image-containter">
          <img
            id="form-image"
            src="/images/form-page-basketball-background.jpg"
            align="left"
            alt=''
          />
        </div>

        <p id="select-sport-title"> Select A Sport </p>
        <p>(Minimum: 1 Selection)</p>

        <div id="container-for-all-images">
          { allSports.map(s => (
            <div
              name={s.name}
              id="individual-image-container"
              onClick={handleSportsSelection}
            >
              <img
                src={`/images/${s.name}.jpg`}
                width="100%"
                height="100%"
                id={s.id}
                name={s.name}
                alt=""
              />
              <div id="sportsName-container">
                <h4 id="sportsName">{s.name}</h4>
              </div>
            </div>
          ))}
        </div>
        <form>
          <input
            className="input"
            id="sportsTile-submit"
            type="submit"
            value="Next"
            onClick={submitForm}
          />
        </form>
      </div>
    );
  }
}
