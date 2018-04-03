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
      Name: "",
      m: moment(),
      imgScr: "",
      Address: "",
      start: false,
      end: false,
      DateInfo: "",
      startTime: "",
      endTime: "",
      Description: "",
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
    const id = e.target.value;
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
            console.log('data i am getting after adding an event',res.data)
            this.setState({
              event_id:res.data.event.id,
              submit:true
            })
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
        ` https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          e.target.value
        }&location=nyc&radius=10&key=AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE`
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
        <h1 id="event-title">Create An Event</h1>

        <form onSubmit={this.handleSubmit}>
          Upload A Photo: <br />
          <input
            required
            type="text"
            name="imgScr"
            value={imgScr}
            onChange={this.handleChange}
            style={{color: 'black'}}
          />{" "}
          <br />
          Name Your Event: <br />
          <input
            required
            type="text"
            name="Name"
            value={Name}
            placeholder="Event name"
            onInput={this.handleChange}
            style={{color: 'black'}}
          />{" "}
          <br />
          Enter Address: <br />
            <input
              required
              type="text"
              name="Address"
              placeholder="Address"
              value={Address}
              onChange={this.onChange}
              onFocus={Address}
              style={{color: 'black'}}
            />
          <div id="autocomplete-form">
            {searchResponses.length ? (
              <div id="address-response-container"
              style={{color: 'black'}}
              >
                {searchResponses.map(res => {
                  return (
                    <div
                      id="address-container"
                      onClick={() =>
                        this.setState({
                          Address: res.description,
                          searchResponses: []
                        })
                      }
                    >
                      {res.description}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          Enter Starting Time: <br />
          <button
            style={{ color: "Green" }}
            name="start"
            onClick={this.handleToggle}
          >
            Start Time
          </button>
          <div className="input">
            <input type="text" value={this.state.startTime} readOnly style={{color: 'black'}} />
          </div>
          <Modal show={start} onHide={this.handleClose} >
            <Modal.Body
            style={{  height: "450px"}}
            >
              <InputMoment
                name="startTime"
                moment={this.state.m}
                onChange={this.handleMoment}
                minStep={5}
                onSave={this.handleStartTime}
                style={{  marginLeft: "5%" }}
              />
            </Modal.Body>
          </Modal>
          Enter Ending Time: <br />
          <button
            style={{ color: "Green" }}
            name="end"
            onClick={this.handleToggle}
          >
            End Time
          </button>
          <div className="input">
            <input type="text" style={{color: 'black'}} value={this.state.endTime} readOnly />
          </div>
          <Modal show={end} onHide={this.handleClose} >
            <Modal.Body
            style={{  height: "450px"}}
            >
              <InputMoment
                name="startTime"
                moment={this.state.m}
                onChange={this.handleMoment}
                minStep={5}
                onSave={this.handleEndTime}
                style={{  marginLeft: "5%" }}
              />
            </Modal.Body>
          </Modal>
          Select A Sport:{" "}
          <select
            style={{ backgroundColor: "#41CFFD" }}
            onChange={this.handleSportSelect}
          >
            {["", ...sports].map((sport, idx) => (
              <option key={idx} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>{" "}
          <br />
          Choose Team Dynamic:{" "}
          <select
            style={{ backgroundColor: "#41CFFD" }}
            class="team"
            onChange={this.handleSportFormat}
          >
            {["", ...gameFormat].map(game => (
              <option value={game.id}>{game.description}</option>
            ))}
          </select>{" "}
          <br />
          Describe You're Game <br />
          <textarea
            rows="6"
            cols="40"
            type="textarea"
            name="Description"
            value={Description}
            placeholder="Description"
            onInput={this.handleChange}
            style={{color: 'black'}}
          />{" "}
          <br />
          <input
            type="submit"
            value="Create event"
            style={{ backgroundColor: "red" }}
          />
        </form>
      </div>
    );
  };
  render() {
    const { submit, event_id } = this.state;
    console.log('the event id is',event_id)
    const url = `/user/event/myevents/${event_id}`
    return <div>
      {submit ? <Redirect to={url} /> : this.form()}
      </div>;
  }
}
