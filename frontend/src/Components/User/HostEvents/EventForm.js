import React from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import AutocompleteTextInput from "./AutocompleteInputText";
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
      address: "",
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
      sportSelected: '',
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
    const sport = e.target.name
    this.setState({sportSelected: sport})
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

  handleAddressInput = placeInfo => {
    //console.log('handleAddressInput -> place:', placeInfo);
    const { address, lat, long } = placeInfo
    this.setState({
      address,
      lat,
      long 
    })
  }

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
      address,
      startTime,
      imgScr,
      endTime,
      Description,
      sport_id,
      format_id,
      lat,
      long
    } = this.state;
       axios
          .post("/event/add", {
            name: Name,
            lat: lat,
            long: long,
            location: address,
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
  };

  componentDidMount() {
    axios
      .get("/user/sports")
      .then(res => {
        this.setState({
          sports: res.data.sports
        });
      })
      .catch(err => console.log(err));
  }

  form = () => {
    const {
      Name,
      imgScr,
      Description,
      sports,
      start,
      end,
      gameFormat,
      sportSelected
    } = this.state;

    return (
      <div id="event-form">
        <div className="event-background" />
        <div className="title-name">
        <h1 id="event-title">Host a Game</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="row">
              <div className="col-25">
                <label htmlFor="imgScr">Upload A Photo: </label>
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
              <label htmlFor="Name">Name Your Event: </label>
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
                <label className= "address_lab" htmlFor="address">Enter Address: </label>
              </div>
              <div className=" col-75 address">
                <AutocompleteTextInput handleAddressInput={this.handleAddressInput}/>
              </div>
            </div>

          <div className="row">
            <div className="col-25">
              <label className="time-label" htmlFor="startT">
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
              <label className="time-label" htmlFor="endT">
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
              <label> Select A Sport:</label>
            </div>
            <div className="col-75">
                {sports.map((sport, idx) => (
                  <div 
                    key={idx}
                    className='icon-container'
                    name={sport.name}
                  >
                    {
                      //If current sport-icon is the one user selected put checkmark in front of it
                      //To show it has been selected
                      sport.name === sportSelected 
                      ? <img 
                          className='checkmark'
                          src='/icons/checkmark.png'
                          alt='checkmark symbol'
                        />
                      :''
                    }
                    <img
                      src={`/icons/${sport.name}-icon.png`}
                      alt={sport.name}
                      title={sport.name}
                      id={sport.id} 
                      name={sport.name}
                      onClick={this.handleSportSelect}
                      className='sport-icon'
                    />
                  </div>
                ))}
              </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="verses">Choose Team Dynamic:</label>
            </div>
            <div className="col-75">
              <select
                name="verses"
                className="team"
                onChange={this.handleSportFormat}
              >
                {["", ...gameFormat].map((game, i)=> (
                  <option key={i} value={game.id}>{game.description}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="Description">Describe You're Game </label>
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
    const url = `/user/event/${event_id}`
    return <div>
      {submit ? <Redirect to={url} /> : this.form()}
      </div>;
  }
}