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
//pass event_id as props 
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/event/info/${id}`)
        .then(res => {

            this.setState({
                event: res.data.event
            })
        })
    }
//probably changed this route
    joinEvent = () =>{
        const { event } = this.state
        axios.post('/event/join',{
            event_id:event.id
        })
        .then(res => {
         this.setState({
            msg:'Congratulations! You have been added to the event'
       })
   })
        .catch(err => console.log('error fetching the event', err))
    }

    //need the event id or some sort of identification thing

    render(){
        const { event } = this.state
        console.log(event)
        return(
            <div>
               <img src={event.img} alt='event' width='150px'/>
   
                   <h3>Name <span>{event.name}</span></h3>
                   <h3>Sport <span>{event.sport_id}</span></h3>
                   <h3>Location <span>{event.location}</span></h3>
                   <h3>Date <span>{event.date}</span></h3>
                   <h3>Start Time <span>{event.start}</span></h3>
                   <h3>End Time <span>{event.end}</span></h3>
                   <h3>Organizer <span>{event.players[0]}</span></h3>
                   <h3>Description <span>{event.description}</span></h3>
   
                   <button onClick = {this.handleDelete} >Delete</button>
            </div>
        )
    }
}