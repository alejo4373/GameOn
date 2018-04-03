import React, { Component } from "react";
import { Panel, ListGroup } from "react-bootstrap";

class Upcoming extends Component {
  render() {
    const { events } = this.props;
    console.log(events);
    return (
      <Panel defaultExpanded id="event-panel">
        <Panel.Collapse>
          {/* <Panel.Body>Some default panel content here.</Panel.Body> */}
          <div id="event_container">
            <ListGroup>
              {events.map(e => {
                return (
                  <a href={`/user/event/${e.id}`}>
                    <div className="individual_event">
                      <img
                        className="host_img"
                        src={e.event_pic}
                        width={"50px"}
                        alt=''
                      />
                      <div className="host_Name">{e.name}</div>
                      <div className="event_descriptions" id={e.id}>
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
                  </a>
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


