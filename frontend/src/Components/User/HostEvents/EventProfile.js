import React from "react";
import axios from "axios";
import './EventProfile.css';

//For the timer to work
const formattedSeconds = (sec) => {
  return(
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)
  )
}

export default class EventProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event:{players: []},
      user: {},
      team: 'A',
      buttonText: '', //'Join' | 'Leave' | 'Start' | 'End'
      delete: false,

      //Timer related
      secondsElapsed: 0, 
      laps: [],
      lastClearedIncrementer: null
    };
     this.incrementer = null;
  };

  componentDidMount(){
    // const userId = this.state.user.id;
    const eventId = this.props.match.params.id;
    axios
    .get("/user/getinfo")
    .then(res => {
      console.log(res.data.user);
      const user = res.data.user
      axios
        .get(`/event/info/${eventId}`)
        .then(res =>{
          const { event } = res.data
          var buttonText = 'Join'
          if(event.host_id === user.id) { buttonText = 'Start' }
          this.setState({
            event: res.data.event,
            buttonText: buttonText,
            user: user
          })
         })
        .catch(err => console.log("Failed To Fetch User:", err));
    })
    .catch(err => console.log("Failed To Fetch User:", err));
  }

  handleStartStopwatchClick(e) {
    this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);
  }
  
  handleStopStopwatchClick(e) {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });   
  }
   

  joinEvent = () => {
    console.log('JOINING EVENT')
    const { event, team } = this.state;
    axios
      .post("/event/join", {
        event_id: event.id,
        team: 'B'
      })
      .then(res => {
        axios
          .get(`/event/info/${event.id}`)
          .then(res => {
            this.setState({
              event: res.data.event,
              msg: "Congratulations! You have been added to the event",
              buttonText: 'Leave',
              show: false,
              Switch: true,
            })}
          )
          .catch(err => console.log("error fetching the event", err));
      })
      .catch(err => console.log("error fetching the event", err));
  };

  handleDelete = () => {
    const { event_id } = this.props;
    axios.delete("/event/delete", { event_id: event_id }).then(
      this.setState({
        delete: true
      })
    )
    .catch(err => console.log('err deleting the event', err));
  };

  handleButton = e => {
    const buttonText = e.target.id;
    switch(buttonText) {
      case 'Join':
        return this.joinEvent()
      case 'Start':
        return this.startEvent();
        break;
      case 'End':
        return this.endEvent();
    } 
  }

  startEvent = () => {
    this.handleStartStopwatchClick()
    console.log('START EVENT')
    const eventId = this.state.event.id
    axios
    .patch(`/event/start/${eventId}`, {actual_start_ts: Date.now()})
      .then(res => {
        this.setState({
          buttonText: 'End'
        })
      })
      .catch(err => console.log('err deleting the event', err));
  }

  endEvent = () => {
    this.handleStopStopwatchClick();
    console.log('ENDING EVENT')
    const eventId = this.state.event.id
    axios
    .patch(`/event/end/${eventId}`,{
      //Hardcoded should not
      winner_team: 'A',
      winner_team_members: '[{"id":1,"username":"alejo4373","team":"A"},{"id":2,"username":"maito2018","team":"A"}]',
      loser_team_members: '[{"id":3,"username":"olu_joya","team":"B","match_judge":true}]',
      actual_end_ts: Date.now()
    })
      .then(res => {
        this.setState({
          buttonText: 'Ended'
        })
      })
      .catch(err => console.log('err deleting the event', err));
  }

  render() {
    const { event, buttonText } = this.state;
    const startDate = new Date(Number(event.start_ts));
    const endDate = new Date(Number(event.end_ts));

    const dateOptions = {  
      weekday: "long", year: "numeric", month: "long",  
      day: "numeric",// hour: "2-digit", minute: "2-digit"  
    };  

    const timeOptions = {
      hour: "2-digit", minute: "2-digit"  
    }
    //Dates as strings ready to display
    const date = startDate.toLocaleDateString('en-US', dateOptions)
    const startTime = startDate.toLocaleTimeString('en-US', timeOptions)
    const endTime = endDate.toLocaleTimeString('en-US', timeOptions)

    return (
      <div className="event-profile">
        <div className="left">
          <div className="card">
            <div className='top' style={{backgroundImage: `url(${event.event_pic})`}}>
            </div>
            <div className='bottom'>
              <div className='sub-header'> Details </div>
              <p className='details-p'>{event.description}</p>
            </div>
            </div>
        </div>

        <div className='right'>
          <div className='top'>
            <div className='sub-header'> Overview </div>
            <img src={`/icons/calendar-icon.png`} class='icon'/>
            <div className='text-cell'>
              {date}
              <br/>
              {startTime} to {endTime}
            </div>
            <img src='/icons/pin-icon.png' class='icon'/>
            <div className='text-cell'>{event.location}</div>

            <img src='/icons/user-icon.png' class='icon'/>
            <div className='text-cell'>{event.host_username}</div>

            <img src='/icons/format-icon.png' class='icon'/>
            <div className='text-cell'>{event.sport_format}</div>
          </div>
          <div className='right-middle'>
            <div className='sub-header'>VS</div>
              <div className='team-header'>Team A</div>
              <div className='team-header'>Team B</div>
              {event.players.map(player => player.team === 'A' ? <div>{player.username}</div> : '')}
              {event.players.map(player => player.team === 'B' ? <div>{player.username}</div> : '')}
          </div>
          <div className="stopwatch">
            <div className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</div>
   
              {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer)
                ?
                <div className='bottom'>
                  <div className='button' id={buttonText} onClick={this.handleButton}>{buttonText}</div>
                </div>
                :  
                <div className='bottom'>
                  <div className='button' id={buttonText} onClick={this.handleButton}>{buttonText}</div>
                </div>
                }
          </div>
        </div>
      </div>
    );
  }
}
