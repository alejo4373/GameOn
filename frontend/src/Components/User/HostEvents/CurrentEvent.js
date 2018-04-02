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
      m:moment(),
      startTime: '',
      playTime: '',
      started: false,
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
      timer: setInterval(this.timing, 1000),
      started:true
    })
  }


  timing = () => {
    var t = new Date().toLocaleTimeString()
    console.log('my time',t)
   this.setState({ time: t})
  }

  stop = () => {
    clearInterval(this.state.timer)
    this.setState({
      started:false
    })
  }

  form = () => {
    const { event,show, time, started } = this.state;
    const { leaveEvent, handleShow, handleClose, selectTeam, joinEvent } = this;
    const teamA = event.players.filter(player => player.team === 'A')
    const teamB = event.players.filter(player => player.team === 'B')
    console.log(event)
    return (
      <div className='eventpage'>
        <div className="event_header" style={{backgroundImage: `url(${event.event_pic})`}}>
          <h3 className="title">{event.name}</h3>
          </div>
          <div className="join">
          {show ? (
          <button className="click" onClick={leaveEvent}>Leave</button>
        ) : (
          <button className="click" onClick={handleShow}>Join</button>
        )}
        </div>
        <Template event = { event }/>
        <div className="teams">
        <div className="verse_header">
        <div className="game_header_left">Team A</div>
        <h1 className="verse">VS</h1>
        <div className="game_header_right">Team B</div>
        </div>
        <div className="team_players">
        <ul>
        <div className="A">{teamA.map(player => <li>{player.username}</li>)}</div>
        </ul>
        <ul>
        <div className="B">{teamB.map(player => <li>{player.username}</li>)}</div>
        </ul>
        </div>
        {time}
        {started?<button className="time" onClick = {this.stop}>End Game</button>: <button className="time" onClick = {this.startTime}>Start Game</button> }
        </div>

        <Team show={show} handleClose={handleClose} selectTeam= {selectTeam} joinEvent={joinEvent}/>
      </div>
    );
  };

  render() {
    const { event } = this.state;
    // console.log('what i am getting for my game time',gameTime)
    return <div>
      <div>{event ? this.form() : ""}</div></div>;
  }
}
