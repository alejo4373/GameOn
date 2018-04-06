import React, { Component } from "react";
import { Panel, ListGroup } from "react-bootstrap";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric" // hour: "2-digit", minute: "2-digit"
};

const timeOptions = {
  hour: "2-digit",
  minute: "2-digit"
};

class Upcoming extends Component {
  render() {
    const { events } = this.props;

    return (
      <Panel defaultExpanded id="event-panel">
        <div id="event_container">
          <ListGroup>
            {events.map(e => {
              const startDate = new Date(Number(e.start_ts));
              const endDate = new Date(Number(e.end_ts));
              const date = startDate.toLocaleDateString("en-US", dateOptions);
              const startTime = startDate.toLocaleTimeString(
                "en-US",
                timeOptions
              );
              const endTime = endDate.toLocaleTimeString("en-US", timeOptions);
              return (
                <a href={`/user/event/${e.id}`}>
                  <div className="individual_event">
                    <img
                      className="host_img"
                      src={e.event_pic}
                      width={"50px"}
                      alt=""
                    />
                    <div className="host_name">{e.name}</div>
                    <div className="event_descriptions" id={e.id}>
                      <span className="event_date">{date}</span>
                      <br />
                      <span className="event_time">{startTime} - {endTime}</span>
                      {/* <br />
                      <span className="event_location">
                        Location: {e.location}
                      </span> */}
                      <br />
                      <img src={`/icons/${e.sport_name}-icon.png`} style={{width: 30}}/>
                    </div>
                  </div>
                </a>
              );
            })}
          </ListGroup>
        </div>
      </Panel>
    );
  }
}

export default Upcoming;
