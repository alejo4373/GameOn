import React, { Component } from "react";

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

class EventCardsList extends Component {
  render() {
    const { events } = this.props;

    return (
        <div className="event-cards-container">
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
                  <div className="event-card">
                    <div class="left">
                      <img
                        src={e.event_pic}
                        alt="People playing a sport"
                      />
                    </div>
                    <div className="right" id={e.id}>
                      <h3 className="event-name">{e.name}</h3>
                      <p>{date}</p>
                      <p>{startTime} - {endTime}</p>
                      <img className ="sport-icon" src={`/icons/${e.sport_name}-icon.png`} alt='A sport icon'/>
                    </div>
                  </div>
                </a>
              );
            })}
        </div>
    );
  }
}

export default EventCardsList;
