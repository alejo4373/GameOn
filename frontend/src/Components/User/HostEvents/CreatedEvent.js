import React from "react";
import axios from "axios";
import Template from "./EventTemplate";

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: "",
      delete: false,
      time: 0,
      offset: "",
      interval: "",
      On: false

    };
  }

  updateTime = () => {
    const { On, time } = this.state
    const { timeChange, timeFormatter } = this
    console.log('suuuuup')
    let newTime = time +  timeChange()
    const formatTime = timeFormatter(newTime)
    if (On){
      this.setState({
        time: formatTime
      })
    }
  }

  timeChange = () => {
    const { offset } = this.state
    let currentTime = new Date()
    const change = currentTime - offset
    this.setState({
      offset: currentTime
    })
  }

  timeFormatter = () => {
    const { time } = this.state
    const rawTime = new Date(time);
    
        var minutes = rawTime.getMinutes().toString();
        var seconds = rawTime.getSeconds().toString();
        var milliseconds = rawTime.getMilliseconds().toString();
    
        if (minutes.length < 2) {
          minutes = '0' + minutes;
        }
    
        if (seconds.length < 2) {
          seconds = '0' + seconds;
        }
    
        while (milliseconds.length < 3) {
          milliseconds = '0' + milliseconds;
        }
    
        return minutes + ' : ' + seconds + ' . ' + milliseconds;
  }

  begin = () => {
    this.setState({
      offset: Date.now(),
      On: true
    })
    setInterval(this.updateTime, 1000);
  };

 stop = () =>  {
    this.setState({
      On: false
    })
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/event/info/${id}`)
      .then(res => {
        this.setState({
          event: res.data.event
        });
      })
      .catch(err => console.log("err retrieving the event info", err));
  }

  handleDelete = () => {
    const { event_id } = this.props;
    axios
      .delete("/event/delete", { event_id: event_id })
      .then(
        this.setState({
          delete: true
        })
      )
      .catch(err => console.log("err deleting the event", err));
  };

  form = () => {
    const { event, On, time } = this.state;
    return (
      <div className="eventpage">
        {this.state.delete ? (
          <h2>The event has been deleted </h2>
        ) : (
          <div>
            <div
              className="event_header"
              style={{ backgroundImage: `url(${event.event_pic})` }}
            >
              <h3 className="title">{event.name}</h3>
            </div>
            <Template event={event} />
            <div className= "display-timer">
            <h1 id="timer">{time}</h1>
            </div>
            <div className="event-timer">
              { On? <button id="stop" onClick={this.stop}>Stop</button>: <button id="begin" onClick={this.begin}>Start</button>}
            </div>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  render() {
    console.log("the id that is getting called", this.props.match.params.id);
    console.log("the event that is being render", this.state.event.event);
    return (
      <div>
        {this.state.event ? this.form() : ""}
        {/* {this.state.delete ? <h2>The event has been deleted </h2> : this.form()} */}
      </div>
    );
  }
}
