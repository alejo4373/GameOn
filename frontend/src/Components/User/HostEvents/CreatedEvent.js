import React from 'react';
import axios from 'axios';

export default class Events extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            event: this.props.event
        }
    }
//For player/team axios call to backend
//need the username of the current user
    render(){
        const { event } = this.state
        console.log(event.img)
        return(
            <div>
                <img src={event.img} alt='event' width='150px'/>

                <h3>Name <span>{event.Name}</span></h3>
                <h3>Sport <span>{event.sport}</span></h3>
                <h3>Location <span>{event.Address}</span></h3>
                <h3>Date <span>{event.date}</span></h3>
                <h3>Start Time <span>{event.start}</span></h3>
                <h3>End Time <span>{event.end}</span></h3>
                <h3>Organizer <span>{event.owner}</span></h3>
                <h3>Description <span>{event.description}</span></h3>
            </div>
        )
    }
}