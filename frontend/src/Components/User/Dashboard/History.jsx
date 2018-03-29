import React, { Component } from "react";
// import axios from "axios";
import { Panel, ListGroup } from "react-bootstrap";

class History extends Component {
  state = {
    event: [
      {
        host: "Ozuna",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "basketball",
        results: "w",
        xp_gained: 100
      },
      {
        host: "Daddy Yankee",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "baseball",
        results: "l",
        xp_gained: 20
      },
      {
        host: "Bad Bunny",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "handball",
        results: "w",
        xp_gained: 110
      },
      {
        host: "Romeo",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "tennis",
        results: "l",
        xp_gained: 20
      }
    ]
  };
  render() {
    const { event } = this.state;
    console.log(event);
    return (
      <Panel defaultExpanded id="event-panel">
        <Panel.Heading>
          <Panel.Title toggle>History</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <div id="event_container">
            {/* <Panel.Body>Some default panel content here.</Panel.Body> */}

            <ListGroup>
              {event.map(e => {
                return (
                  <div className="individual_event">
                    <img className="host_img" src={e.host_img} width={"50px"} alt=""/>
                    <span className="host_Name">{e.host}</span>
                    <div className="event_descriptions">
                      <span className="event_location">
                        Location: {e.location}
                      </span>
                      <br />
                      <span>Sport: {e.sport}</span> <br />
                      <span className="xp_gain">
                        XP Gained: {e.xp_gained} pts
                      </span>
                      <br />
                    </div>
                    <div
                      className="event_result"
                      style={{
                        backgroundColor: e.results === "w" ? "green" : "red"
                      }}
                    >
                      {e.results.toUpperCase()}
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

export default History;