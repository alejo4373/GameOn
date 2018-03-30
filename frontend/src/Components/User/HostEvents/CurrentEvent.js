import React from "react";
import axios from "axios";
import moment from "moment";
import Template from "./EventTemplate";
import Team from "./TeamSelector";


export default class Events extends React.Component {
  constructor() {
    super();

    this.state = {
      currentEvent: null,
      teams: [],
      team:'',
      click: false,
      show: false,
      msg: '',
      time:'',
      m:moment().hour(0).minutes(0).second(0),
      startTime: '',
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/event/info/${id}`).then(res => {
      console.log("data receiving", res.data.event);
      this.setState({
        event: res.data.event
      });
    })
    .catch(err => console.log('err retrieving the event info', err));
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
          msg: "Congratulations! You have been added to the event",
          show: false
        });
      }).catch(err => console.log("error fetching the event", err));
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

  startTime = () => {
    this.setState({
      startGame:this.state.m
    })
  }

  endTime = () => {
    this.setState({
      endGame: this.state.m
    })
  }

  form = () => {
    const { event,show } = this.state;
    const { leaveEvent, handleShow, handleClose, selectTeam, joinEvent } = this;
    const teamA = event.players.filter(player => player.team === 'A')
    const teamB = event.players.filter(player => player.team === 'B')

    console.log('showing state', show)
    return (
      <div className='eventpage'>
        <Template event = { event }/>
        {show ? (
          <button onClick={leaveEvent}>Leave</button>
        ) : (
          <button onClick={handleShow}>Join</button>
        )}
        <h3>Team A</h3>
        {teamA.map(player => <li>{player.username}</li>)}
        <h3>Team B</h3>
        {teamB.map(player => <li>{player.username}</li>)}

        <button>Start Game</button>

        <Team show={show} handleClose={handleClose} selectTeam= {selectTeam} joinEvent={joinEvent}/>
      </div>
    );
  };

  render() {
    const { event } = this.state;
    return <div>{event ? this.form() : ""}</div>;
  }
}
