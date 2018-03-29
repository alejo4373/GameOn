import React, { Component } from "react";
// import axios from "axios";
import { Panel, ListGroup } from "react-bootstrap";

class Upcoming extends Component {
  render() {
    const { events } = this.props;
    console.log(events);
    return (
      <Panel defaultExpanded id='event-panel'>
        <Panel.Heading>
          <Panel.Title toggle>Upcoming Events</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          {/* <Panel.Body>Some default panel content here.</Panel.Body> */}
          <div id="event_container">
            <ListGroup>
              {events.map(e => {
                return (
                  <div className="individual_event">
                    <img className="host_img" src={e.event_pic} width={"50px"} />
                    <span className="host_Name">{e.name}</span>
                    <div className="event_descriptions">
                      <span className="event_date">Date: {e.end_ts}</span>
                      <br />
                      <span className="event_time">Time: {e.start_ts}</span>
                      <br />
                      <span className="event_location">
                        Location: {e.location}
                      </span>
                      <br />
                      <span>Sport: {e.sport_name}</span>
                    </div>
                  </div>
                );
              })}
            </ListGroup>
          </div>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default Upcoming;

/**
 *  <ListGroupItem>Item 1</ListGroupItem>
<div id="event_container">
  {event.map(e => {
    return (
      <div className="individual_event">
        <img className="host_img" src={e.host_img} width={"50px"} />
        <span className="host_Name">{e.host}</span>
        <div className="event_descriptions">
          <span className="event_date">Date: {e.date}</span>
          <br />
          <span className="event_time">Time: {e.time}</span>
          <br />
          <span className="event_location">Location: {e.location}</span>
          <br />
          <span>Sport: {e.sport}</span>
        </div>
      </div>
    );
  })}
</div>
 */
