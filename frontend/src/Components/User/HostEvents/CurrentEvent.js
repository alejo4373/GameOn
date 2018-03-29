import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import Template from "./EventTemplate";
import Team from "./TeamSelector"

export default class Events extends React.Component {
  constructor() {
    super();

    this.state = {
      currentEvent: null,
      teams: [],
      team:'',
      click: false,
      show: false,
      msg: ""
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/event/info/${id}`).then(res => {
      console.log("data receiving", res.data.event);
      this.setState({
        event: res.data.event
      });
    });
  }

  joinEvent = () => {
    const { event, team } = this.state;
    axios
      .post("/event/join", {
        event_id: event.id,
        team: team
      })
      .then(res => {
        this.setState({
          msg: "Congratulations! You have been added to the event"
        }).catch(err => console.log("error fetching the event", err));
      });
  };

  leaveEvent = () => {
    const { event } = this.state;
    axios
      .delete("/event/leave", {
        event_id: event.id
      })
      .then(
        this.setState({
          joined: false,
          show: false
        })
      )
      .catch(err => {
        console.log("error leaving the group", err);
      });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  selectTeam = (e) => {
      this.setState({
          team:e.target.value
      })
  }

  form = () => {
    const { event, joined, teams, click, show, msg } = this.state;
    const { leaveEvent, handleShow, handleClose, selectTeam, joinEvent } = this;
    return (
      <div className='eventpage'>
        <Template event = { event }/>
        {show ? (
          <button onClick={leaveEvent}>Leave</button>
        ) : (
          <button onClick={handleShow}>Join</button>
        )}
        { msg }
        <Team show={show} handleClose={handleClose} selectTeam= {selectTeam} joinEvent={joinEvent}/>
      </div>
    );
  };

  render() {
    const { event } = this.state;
    return <div>{event ? this.form() : ""}</div>;
  }
}
