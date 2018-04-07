import React from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import moment from "moment";
import "./time.css";
import "./Events.css";
import InputMoment from "input-moment";
//import Events from "./CreatedEvent";

export default class Event extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: "Soccer And The City",
      m: moment(),
      imgScr: "http://worldsoccertalk.com/wp-content/uploads/2013/11/manchester-city-new-york-600x400.png",
      Address: "James J Walker Park",
      start: false,
      end: false,
      DateInfo: "",
      startTime: "",
      endTime: "",
      Description: "Hey Footballers all over New York City. Let's get together to play friendly, competitive and fun pickup games. Come and exercise physically and mentally. Grow & develop yourself with others through the sport of soccer.",
      sport: "",
      lat: "",
      long: "",
      submit: false,
      event_id: "",
      players: "",
      sports: [],
      gameFormat: [],
      format_id: "",
      sport_id: "",
      event: "",
      searchResponses: [],
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleMoment = m => {
    this.setState({ m });
  };

  handleSportSelect = e => {
    const id = e.target.id;
    axios.get(`/sport/formats/${id}`).then(res => {
      this.setState({
        gameFormat: res.data.formats,
        sport_id: Number(id)
      });
    });
  };

  handleSportFormat = e => {
    this.setState({
      format_id: e.target.value
    });
  };

  handleStartTime = () => {
    this.setState({
      startTime: this.state.m.format("llll"),
      start: false
    });
  };

  handleEndTime = () => {
    this.setState({
      endTime: this.state.m.format("llll"),
      end: false
    });
  };
  handleToggle = e => {
    this.setState({
      [e.target.name]: !this.state.name
    });
  };

  loadPage = id => {
    axios
      .get(`/event/info/${id}`)
      .then(res =>
        this.setState({
          event: res.data,
          submit: true
        })
      )
      .catch(err => console.log(err));
  };

  handleClose = () => {
    this.setState({ start: false, end: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      Name,
      Address,
      startTime,
      imgScr,
      endTime,
      Description,
      sport_id,
      format_id
    } = this.state;

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${Address}&key=AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE`
      )
      .then(res => {
        console.log("Response API", res);
        axios
          .post("/event/add", {
            name: Name,
            lat: res.data.results[0].geometry.location.lat,
            long: res.data.results[0].geometry.location.lng,
            location: Address,
            start_ts: new Date(startTime).getTime(),
            end_ts: new Date(endTime).getTime(),
            description: Description,
            sport_id: sport_id,
            sport_format_id: format_id,
            event_pic: imgScr
          })
          .then(res => {
            console.log("data i am getting after adding an event", res.data);
            this.setState({
              event_id: res.data.event.id,
              submit: true
            });
          })
          .catch(err => console.log("Error Adding Event:", err));
      })
      .catch(error => console.error("Error", error));
  };

  onChange = e => {
    this.setState({
      Address: e.target.value
    });
    axios
      .get(
        ` https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e
          .target
          .value}&location=nyc&radius=10&key=AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE`
      )
      .then(res => {
        this.setState({
          searchResponses: res.data.predictions
        });
      });
  };

  componentWillMount() {
    axios
      .get("/user/sports")
      .then(res => {
        console.log(res.data);
        this.setState({
          sports: res.data.sports
        });
      })
      .catch(err => console.log(err));
  }

  form = () => {
    const {
      Name,
      Address,
      imgScr,
      Description,
      sports,
      start,
      end,
      gameFormat,
      searchResponses
    } = this.state;

    return (
      <div id="event-form">
        <div className="event-background" />
        <div className="title-name">
        <h1 id="event-title">Create An Event</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="row">
              <div className="col-25">
                <label for="imgScr">Upload A Photo: </label>
              </div>
              <div className="col-75">
                <input
                  required
                  className="event-form"
                  type="text"
                  name="imgScr"
                  value={imgScr}
                  onChange={this.handleChange}
                  style={{ color: "black" }}
                />
              </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="Name">Name Your Event: </label>
            </div>
            <div className="col-75">
              <input
                required
                className="event-form"
                type="text"
                name="Name"
                value={Name}
                placeholder="Event name"
                onInput={this.handleChange}
                style={{ color: "black" }}
              />
            </div>
          </div>

          <div className="row add">
              <div className="col-25 address-label">
                <label className= "address_lab" for="address">Enter Address: </label>
              </div>
              <div className=" col-75 address">
                <input
                  required
                  className="event-form"
                  type="text"
                  id="address"
                  name="Address"
                  placeholder="Address"
                  value={Address}
                  onChange={this.onChange}
                  onFocus={Address}
                  style={{ color: "black" }}
                />
              </div>
            </div>

            {searchResponses.length ? (
              <div id="address-response-container">
                {searchResponses.map(res => {
                  return (
                    <div
                      id="address-container"
                      onClick={() =>
                        this.setState({
                          Address: res.description,
                          searchResponses: []
                        })}
                    >
                      {res.description}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}


          <div className="row">
            <div className="col-25">
              <label className="time-label" for="startT">
                <button
                className='times'
                  name="start"
                  onClick={this.handleToggle}
                >
                  Start Time
                </button>
              </label>
            </div>
            <div className="col-75">
              <input
                id="startT"
                className="event-form"
                type="text"
                value={this.state.startTime}
                readOnly
                style={{ color: "black" }}
              />
            </div>
          </div>
          <Modal show={start} onHide={this.handleClose}>
            <Modal.Body style={{ height: "450px" }}>
              <InputMoment
                name="startTime"
                moment={this.state.m}
                onChange={this.handleMoment}
                minStep={5}
                onSave={this.handleStartTime}
                style={{ marginLeft: "5%" }}
              />
            </Modal.Body>
          </Modal>
          <div className="row">
            <div className="col-25">
              <label className="time-label" for="endT">
                <button
                className='times'
                  name="end"
                  onClick={this.handleToggle}
                >
                  End Time
                </button>
              </label>
            </div>
            <div className="col-75">
              <input
              className="event-form"
                id="endT"
                type="text"
                style={{ color: "black" }}
                value={this.state.endTime}
                readOnly
              />
            </div>
          </div>
          <Modal show={end} onHide={this.handleClose}>
            <Modal.Body style={{ height: "450px" }}>
              <InputMoment
                name="startTime"
                moment={this.state.m}
                onChange={this.handleMoment}
                minStep={5}
                onSave={this.handleEndTime}
                style={{ marginLeft: "5%" }}
              />
            </Modal.Body>
          </Modal>
          <div className="row">
            <div className="col-25">
              <label for="sports"> Select A Sport:</label>
            </div>
            <div className="col-75">

                {sports.map((sport, idx) => (
                  <div style={{ float: "left", marginLeft: '5px'}} id='sport-icon'>
                    <img
                      src={`/icons/${sport.name}-icon.png`}
                      width="40px"
                      height="40px"
                      alt={sport.name}
                      id={sport.id} onClick={this.handleSportSelect}
                    />
                  </div>
                ))}
              </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label for="verses">Choose Team Dynamic:</label>
            </div>
            <div className="col-75">
              <select
                name="verses"
                //style={{ backgroundColor: "#41CFFD" }}
                class="team"
                onChange={this.handleSportFormat}
              >
                {["", ...gameFormat].map(game => (
                  <option value={game.id}>{game.description}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="Description">Describe You're Game </label>
            </div>
            <div className="col-75">
              <textarea
                rows="6"
                cols="50"
                type="textarea"
                name="Description"
                id="Description"
                value={Description}
                placeholder="Description"
                onInput={this.handleChange}
                style={{ color: "black" }}
              />
            </div>
          </div>
          <input
          id='submit-form-btn'
          className="times"
            type="submit"
            value="Create event"
          />
          </div>
        </form>
        </div>
    );
  };
  render() {
    const { submit, event_id } = this.state;
    console.log('the event id is',event_id)
    const url = `/user/event/${event_id}`
    return <div>
      {submit ? <Redirect to={url} /> : this.form()}
      </div>;
  }
}