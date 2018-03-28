import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const Team = props => {
  const { show, handleClose, selectTeam, joinEvent } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Choose your team</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <button class='popup A' value="A" onClick={selectTeam}>
          Team A
        </button>
        <br />
        <button class='popup B' value="B" onClick={selectTeam}>
          Team B
        </button>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button bsStyle="primary">GameOn</Button>
      </Modal.Footer>
    </Modal>
  );
};

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
    console.log("starting and then going to get the data");
    const id = this.props.match.params.id;
    axios.get(`/event/info/${id}`).then(res => {
      console.log("data receiving", res.data.event);
      this.setState({
        event: res.data.event
      });
    });
  }

  // listTeam = () => {
  //     //will have to check if number of participants has reached the number of participant
  //     //get request to check how many players are currently in a team
  //     //need the max amount of players in the team
  //     //might not iterate through everything

  //     const team = {'Team_A': 2, 'Team_B': 3, 'Team_C': 1}
  //     // const games = ['1 X 1', '2 X 2', '3 X 3']
  //     let game = []
  //     for(var prop in team){
  //         if(team[prop] < 3){
  //             //show it in the pop up
  //             console.log('getting my team list', this.state.teams)
  //              game.push(team[prop])
  //         }
  //     }
  //     this.setState({
  //         teams: game,
  //         click: true
  //     })
  // }

  joinEvent = () => {
    //Send post request to the backend
    //propbably send the team the user choose
    const { event } = this.state;
    axios
      .post("/event/join", {
        event_id: event.id
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
    console.log("calling this function");
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
    const date = new Date(Number(event.start_ts));
    const end = new Date(Number(event.end_ts));

    return (
      <div className='eventpage'>
        <h3>Name: {event.name}</h3>
        <h3>Sport: {event.sport_name.charAt(0).toUpperCase() + event.sport_name.slice(1)}</h3>
        <h3>Location: {event.location}</h3>
        <h3>Date: {date.toDateString()}</h3>
        <h3>Start Time: {date.toTimeString()}</h3>
        <h3>End Time: {end.toTimeString()}</h3>
        <h3>Organizer: {event.players_usernames[0]}</h3>
        <h3>Description: {event.description}</h3>
        
        {show ? (
          <button onClick={leaveEvent}>Leave</button>
        ) : (
          <button onClick={handleShow}>Join</button>
        )}
        { msg }
        <Team show={show} handleClose={handleClose} selectTeam= {selectTeam} joinEvent={joinEvent}/>
        {/* {click? teams.map(elem => <button onClick = {this.chooseTeam} >{ elem }</button>): ''} */}
      </div>
    );
  };

  render() {
    const { event } = this.state;
    return <div>{event ? this.form() : ""}</div>;
  }
}
