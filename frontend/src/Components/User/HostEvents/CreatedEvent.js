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
      interval: null,
    };
    this.interval = null
  }

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
    // eslint-disable-next-line 
    const { event, time, interval } = this.state;
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
            {/* <div className="display-timer">
              <h1 id="timer">{time}</h1>
            </div>
            <div className="event-timer">
              { On? <button id="stop" onClick={this.stop}>Stop</button>: <button id="begin" onClick={this.begin}>Start</button>}
            </div> */}
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
