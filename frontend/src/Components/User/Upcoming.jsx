import React, {Component} from 'react'
import axios from 'axios'

class Upcoming extends Component{
    state = {
        event: [
            { host: 'Ozuna',
              host_img: 
              'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF',
              date: '01/08/2018' ,
              location: 'HighLand Park Court, Brooklyn, NY',
              sport:  'basketball'
            },
            { host: 'Daddy Yankee',
              host_img: 
              'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF',
              date: '01/08/2018' ,
              location: 'HighLand Park Court, Brooklyn, NY',
              sport:  'baseball'
            },
            { host: 'Bad Bunny',
              host_img: 
              'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF',
              date: '01/08/2018' ,
              location: 'HighLand Park Court, Brooklyn, NY',
              sport:  'handball'
            },
            { host: 'Romeo',
              host_img: 
              'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF',
              date: '01/08/2018' ,
              location: 'HighLand Park Court, Brooklyn, NY',
              sport:  'tennis'
            }
        ]
    }
    render(){
        const {event} = this.state
        return (
            <div id='event_container'>
                <h2 id='event_title'>EVENTS</h2>
                {event.map(e => {
                    <div className='individual_event'>
                        <img className='host_img' src={e.host_img} />
                        <h3 className='host_Name'>{e.host}</h3>
                        <span className='event_date'>Date: {e.date}</span>
                        <span className='event_location'>Location: {e.location}</span>
                    </div>
                })}
            </div>
        )
    }
}