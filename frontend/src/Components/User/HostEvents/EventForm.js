import React from "react";
import axios from "axios";
import moment from 'moment';
import "./time.css"
import InputMoment from 'input-moment';

import Events from "./CreatedEvent";

export default class Event extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      m: moment(),
      imgScr: null,
      sportIDs: '',
      Address: "",
      start:false,
      end: false,
      DateInfo: null,
      startTime: null,
      endTime: null,
      Description: "",
      sport: null,
      lat: null,
      long: null,
      submit: false,
      event_id: null,
      players: '',
      sports: [],
      gameCombo: null,
      team: {'basketball': [1,5], 'tennis': [1,2], 'handball':[1,3], 'soccer': [7,11], 'football': [6, 11], 'volleyball':[4,6]}
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleMoment = m => {
    this.setState({ m })
  }


  //Will have to change this to receive the sport name not sport_id
  //Get request to get possible combinations possible
  handleSelect = e => {
    // axios.get('', {sport_id: e.target.value})
    // .then(res => this.setState({
    //   gameCombo: res.data,
    //   sport_id: e.target.value
    // }))
    this.setState({
      sport_id: e.target.value
    });
  };

  handleStartTime = () => {
    this.setState({
      startTime: this.state.m.format('llll'),
      start:false
    })
  }

  handleEndTime = () => {
    this.setState({
      endTime: this.state.m.format('llll'),
      end: false
    })
  }

  handleToggle = (e) => {
    let name = e.target.name
    this.setState({
      [e.target.name]: !this.state.name
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
      const {Name, Address, DateInfo, startTime,imgScr, endTime, Description, sport_id, lat, long} = this.state

      axios.post('/event/add',
      {name:Name,
      lat:40.755603,
      long:-73.984931,
      location:Address,
      start_ts: new Date(startTime).getTime(),
      end_ts: new Date(endTime).getTime(),
      description:Description,
      sport_id:sport_id,
      event_pic:imgScr
   })
   .then(res => {
    this.setState({
     submit:true,
     players:res.data.event.players_usernames,
     event_id:res.data.event.id
   })
   })
  }

  componentDidMount() {
    axios.get("/user/sports").then(res => {
      console.log(res.data)
      const names = res.data.sports.map(sport => sport.name)
      const id = res.data.sports.map(sport => sport.id)
      this.setState({
        sports: names,
        sportIDs: id
      });
    });
  }

  form = () => {
    const {
      Name,
      Address,
      imgScr,
      DateInfo,
      startTime,
      endTime,
      Description,
      sports,
      start,
      end,
      team
    } = this.state;

    return (
      <div>
        <h1>Create An Event</h1>

        <form onSubmit={this.handleSubmit}>
        {<input
          type='text'
          name= 'text'
          value= {imgScr}
          onChange={this.handleChange}
          />}

          <input
            type="text"
            name="Name"
            value={Name}
            placeholder="Event name"
            onInput={this.handleChange}
          />

          <input
            type="text"
            name="Address"
            value={Address}
            placeholder="Address"
            onInput={this.handleChange}
          />

          <button name= 'start' onClick= {this.handleToggle}>Start Time</button>
          <div className="input">
            <input type="text" value={this.state.startTime} readOnly />
          </div>
          {start? 
          <InputMoment
            name = 'startTime'
            moment={this.state.m}
            onChange={this.handleMoment}
            minStep={5}
            onSave={this.handleStartTime}
          />
          : ''
          }

          <button name = 'end' onClick= {this.handleToggle}>End Time</button>
         
          <div className="input">
            <input type="text" value={this.state.endTime} readOnly />
          </div>

          {end? 
          <InputMoment
            name = 'endTime'
            moment={this.state.m}
            onChange={this.handleMoment}
            minStep={5}
            onSave={this.handleEndTime}
          /> : ''
          }

          <select onChange={this.handleSelect}>
            {["", ...sports].map((sport, idx) => (
              <option key={idx} value={sport? this.state.sportIDs[idx-1] : ''}>
                {sport}
              </option>
            ))}
          </select>

          <select class="team"><option>Team</option></select>

          {/* <select>
            {for(var i = team.sport_id[1][0]; i > team.sport_id[1][1]; i++ ){ 
            return(<option> {elem} X {elem} </option>)
          }}
          </select> */}

          <input
            type="textarea"
            name="Description"
            value={Description}
            placeholder="Description"
            onInput={this.handleChange}
          />

          <input type="submit" value="Create event" />
        </form>
      </div>
    );
  };
  render() {
    const { submit, sports } = this.state;
    
    const {
      Name,
      Address,
      imgScr,
      DateInfo,
      startTime,
      endTime,
      Description,
      sport_id,
      sportIDs,
      players,
      event_id
    } = this.state;

    const sport = sports[sportIDs.indexOf(Number(sport_id))]

    const event = {
      sport: sport,
      Name: Name,
      date: DateInfo,
      img: imgScr,
      Address: Address,
      date: DateInfo,
      start: startTime,
      end: endTime,
      description: Description,
      players:players,
      event_id: event_id
    };

    return <div>{submit ? <Events event={event} /> : this.form()}</div>;
  }
}

