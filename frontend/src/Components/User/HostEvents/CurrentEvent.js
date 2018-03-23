import React from 'react';
import axios from 'axios'

export default class Events extends React.Component{
    constructor(){
        super()

        this.state = {
            event: null
        }
    }

    // joinEvent = () =>{
    //     axios.post('',{
    //         username:username,
    //         eventId:eventId
    //     })
    // }
    //need the event id or some sort of identification thing
    // componentDidMount(){
    //     axios.get('/event')
    //     .then(event => this.setState({
    //         event:event
    //     })
    //     .catch(err => console.log('failed to fetch the event', err))
    // )
    // }

    render(){
        const { event } = this.state
        return(
            <div>
                <img src={ event.image } alt='event' />

                <h3>Sport <span>event.sport</span></h3>
                <h3>Location <span>event.location</span></h3>
                <h3>Start Time <span>event.start_time</span></h3>
                <h3>End Time <span>event.end_time</span></h3>
                <h3>Organizer <span>event.owner</span></h3>
                <h3>Player/ Team <span>event.players</span></h3>
                <h3>Description <span>event.description</span></h3>

                <button onClick={this.joinEvent}>Join</button>
            </div>
        )
    }
}