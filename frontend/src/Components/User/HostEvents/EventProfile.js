import React from "react";
import axios from "axios";
import './EventProfile.css';
export default class EventProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {
            "id": 1,
            "host_id": 1,
            "lat": 40.7580278,
            "long": -73.881801,
            "start_ts": "1521754233284",
            "end_ts": "1521755961187",
            "actual_start_ts": "1521755233284",
            "actual_end_ts": "1521756961187",
            "name": "Soccer at the park",
            "location": "Bryant Park, New York, NY",
            "sport_id": 2,
            "sport_format_id": 6,
            "event_pic": "/images/soccer1.jpg",
            "description": "Hey Footballers all over New York City. Let's get together to play friendly, competitive and fun pickup games. Come and exercise physically and mentally. Grow & develop yourself with others through the sport of soccer.",
            "cancelled": false,
            "winner_team": null,
            "host_username": "alejo4373",
            "sport_name": "soccer",
            "sport_format": "3x3",
            "num_players": "6",
            "players": [ 
              { "id": 1, "username": "alejo4373", "team": "A", "match_judge": true },
              { "id": 2, "username": "maito2018", "team": "A", "match_judge": false },
              { "id": 3, "username": "olu_joya", "team": "B", "match_judge": true },
              { "id": 2, "username": "bart178", "team": "A", "match_judge": false },
              { "id": 2, "username": "lol101", "team": "B", "match_judge": false },
              { "id": 2, "username": "michelle01", "team": "B", "match_judge": false },
            ]
        },
      delete: false
    };
  }

  // componentDidMount(){
  //   const id = this.props.match.params.id;
  //   axios
  //   .get(`/event/info/${id}`)
  //   .then(res =>{
  //     this.setState({
  //       event: res.data.event
  //     })
  //   }
  //   )
  //   .catch(err => console.log('err retrieving the event info', err));
  // }

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
    const startTime = 0;
    const endTime = new Date(Number(event.end_ts));
    console.log(date)

    const options = {  
      weekday: "short", year: "numeric", month: "short",  
      day: "numeric", hour: "2-digit", minute: "2-digit"  
  };  

    return (
      <div className="event-profile">
        <div className="header" style={{backgroundImage: `url(${event.event_pic})`}}>
        </div>
        <div className='middle'>
          <div className='left'>
            <div>
              <h3> Details </h3>
              <p>{event.description}</p>
            </div>
          </div>
          <div className='right'>
            <h3 className='span'> Overview </h3>
            <img src={`/icons/calendar-icon.png`} class='icon'/>
            <p>{event.sport_name}</p>

            <img src='/icons/pin-icon.png' class='icon'/>
            <p>{event.location}</p>

            <img src='/icons/user-icon.png' class='icon'/>
            <p>{event.host_username}</p>

            <img src='/icons/format-icon.png' class='icon'/>
            <p>{event.sport_format}</p>
          </div>
       </div>
       <div className='bottom'>
         <div className='left'>
         </div>
         <div className='right'>
          <button>Join</button>
          </div>
       </div>
      </div>
    );
  }
}
