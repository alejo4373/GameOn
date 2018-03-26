import React from 'react';
import axios from 'axios';

export default class Events extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            event: this.props.event,
            delete: false
        }
    }

    handleDelete = () => {
        const { event_id } = this.state
        axios.delete('/event/delete',{event_id: event_id})
        .then(
            this.setState({
                delete:true
            })
            )
    }

    form = () => {
        const { event } = this.state
       return (
        <div>
                   <img src={event.img} alt='event' width='150px'/>
   
                   <h3>Name <span>{event.Name}</span></h3>
                   <h3>Sport <span>{event.sport}</span></h3>
                   <h3>Location <span>{event.Address}</span></h3>
                   <h3>Date <span>{event.date}</span></h3>
                   <h3>Start Time <span>{event.start}</span></h3>
                   <h3>End Time <span>{event.end}</span></h3>
                   <h3>Organizer <span>{event.players[0]}</span></h3>
                   <h3>Description <span>{event.description}</span></h3>
   
                   <button onClick = {this.handleDelete} >Delete</button>
   </div>
       ) 
    }
//For player/team axios call to backend
//need the username of the current user
    render(){
        console.log(this.state.delete)
        return(
            <div>
              {this.state.delete? <h2>The event has been deleted </h2> : this.form()}
            </div>
        )
    }
}