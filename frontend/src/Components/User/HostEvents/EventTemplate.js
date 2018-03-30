import React from "react";

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: this.props.event
    };
  }

  render() {
    const { event } = this.state;
    const date = new Date(Number(event.start_ts));
    const end = new Date(Number(event.end_ts));
    console.log(date.getDate())

    const options = {  
      weekday: "long", year: "numeric", month: "short",  
      day: "numeric", hour: "2-digit", minute: "2-digit"  
  };  

    return (
      <div className="container">
        <div className="details" >
          <div className='middle'>
          <div className="eventinfo">
          <h3><i class="fas fa-calendar-alt"></i> {date.toLocaleTimeString('en-US',options)}</h3>
          <h3 className="end">{end.toLocaleTimeString('en-US', options)}</h3>
          <h3><i class="fas fa-map-marker-alt"></i> {event.location}</h3>
          <h3><i class="fas fa-user"></i> {event.players[0].username}</h3>
          </div>
          <div className="info">
          <h3>Description <h4 class="decription">{event.description}</h4></h3>
          <h3>
            Sport
            <h4>
            {event.sport_name.charAt(0).toUpperCase() +
              event.sport_name.slice(1)}
            </h4>
          </h3>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
