import React from 'react';
import axios from 'axios'

export default class Events extends React.Component{
    constructor(){
        super()

        this.state = {
            event: null,
            msg:''
        }
    }
//Dont have the route yet
    componentDidMount(){
        axios.get('')
        .then(res => {
            this.setState({
                event: res.event
            })
        })
    }
//probably changed this route
    // joinEvent = () =>{
        //const { event } = this.state
    //     axios.post('/event/invite',{
    //         event_id:event.id,
    //         host_id: host.id
    //     })
    //     .then(res => {
        //  this.setState({
            //msg:'Congratulations! You have been added to the event';
      //  })
   // })
    //     .catch(err => console.log('error fetching the event', err))
    // }

    //need the event id or some sort of identification thing

    render(){
        const { event } = this.state
        return(
            <div>
                <img src={ event.image } alt='event' />

                <h3>Sport <span>{event.sport}</span></h3>
                <h3>Location <span>{event.location}</span></h3>
                <h3>Start Time <span>{event.start_time}</span></h3>
                <h3>End Time <span>{event.end_time}</span></h3>
                <h3>Organizer <span>{event.owner}</span></h3>
                <h3>Player/ Team <span>{event.players}</span></h3>
                <h3>Description <span>{event.description}</span></h3>

                <button onClick={this.joinEvent}>Join</button>
            </div>
        )
    }
}