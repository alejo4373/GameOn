import React from "react";

export default class Event extends React.Component{
    render(){
        const event = this.props.event
        console.log(event)
        const date = new Date(Number(event.start_ts));
        console.log(date.toTimeString)
        const end = new Date(Number(event.end_ts));
        return (
          <div>
            <img class = "eventpic" src={event.event_pic} alt="" width="150px" />
            <div class= "details"> 
            <h4>Name: {event.name}</h4>
            <h4>
              Sport:{" "}
              {event.sport_name.charAt(0).toUpperCase() + event.sport_name.slice(1)}
            </h4>
            <h4>Location: {event.location}</h4>
            <h4>Date: {date.toDateString()}</h4>
            <h4>Start Time: {date.toTimeString()}</h4>
            <h4>End Time: {end.toTimeString()}</h4>
            <h4>Organizer: {event.players[0].username}</h4>
            <h4>Description: {event.description}</h4>
            </div>
          </div>
        );
    }
};
