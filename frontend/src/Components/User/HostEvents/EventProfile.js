import React from "react";
import axios from "axios";

export default class EventProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: '',
      delete: false
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    axios
    .get(`/event/info/${id}`)
    .then(res =>{
      this.setState({
        event: res.data.event
      })
    }
    )
    .catch(err => console.log('err retrieving the event info', err));
  }

  handleDelete = () => {
    const { event_id } = this.props;
    axios.delete("/event/delete", { event_id: event_id }).then(
      this.setState({
        delete: true
      })
    )
    .catch(err => console.log('err deleting the event', err));
  };

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
          <h3>
            Team Dynamic
            <h4>
              {event.sport_format}
            </h4>
          </h3>
          </div>

          </div>
        </div>
      </div>
    );
  }
}
