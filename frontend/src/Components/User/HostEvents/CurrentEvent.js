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
      time:0,
      m:moment(),
      startTime: '',
      playTime: '',
      started: true,
      timer: ''
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

  //event/start
  //event/id
  //and start time
  startTime = () => {
    this.setState({
      timer: setInterval(this.timing, 1000)
    })
  }


  timing = (t) => {
    var t = new Date().toLocaleTimeString()
    console.log('my time',t)
   this.setState({ time: t})
  }

  stop = () => {
    clearInterval(this.state.timer)
  }

  form = () => {
    const { event,show, time, gameTime } = this.state;
    const { leaveEvent, handleShow, handleClose, selectTeam, joinEvent } = this;
    const teamA = event.players.filter(player => player.team === 'A')
    const teamB = event.players.filter(player => player.team === 'B')
    console.log(event)
    return (
      <div className='eventpage'>
        <Template event = { event }/>
        {time}
        {show ? (
          <button onClick={leaveEvent}>Leave</button>
        ) : (
          <button onClick={handleShow}>Join</button>
        )}
        <h3>Team A</h3>
        {teamA.map(player => <li>{player.username}</li>)}
        <h3>Team B</h3>
        {teamB.map(player => <li>{player.username}</li>)}

        <button onClick = {this.startTime}>Start Game</button>

        <button onClick = {this.stop}>End Game</button>
        <h2>{gameTime}</h2>

        <Team show={show} handleClose={handleClose} selectTeam= {selectTeam} joinEvent={joinEvent}/>
      </div>
    );
  };

  render() {
    const { event, m } = this.state;
    // console.log('what i am getting for my game time',gameTime)
    return <div>
      <div>{event ? this.form() : ""}</div></div>;
  }
}
