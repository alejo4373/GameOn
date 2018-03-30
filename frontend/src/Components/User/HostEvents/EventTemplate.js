import React from "react";

export default class Event extends React.Component{
    render(){
        const event = this.props.event
        const date = new Date(Number(event.start_ts));
        const end = new Date(Number(event.end_ts));
        return (
          <div>
            <img src={event.img} alt="event" width="150px" />
      
            <h3>Name: {event.name}</h3>
            <h3>
              Sport:{" "}
              {event.sport_name.charAt(0).toUpperCase() + event.sport_name.slice(1)}
            </h3>
            <h3>Location: {event.location}</h3>
            <h3>Date: {date.toDateString()}</h3>
            <h3>Start Time: {date.toTimeString()}</h3>
            <h3>End Time: {end.toTimeString()}</h3>
            <h3>Organizer: {event.players[0].username}</h3>
            <h3>Description: {event.description}</h3>
          </div>
        );
    }
};
