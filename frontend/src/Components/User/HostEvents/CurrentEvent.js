import React from 'react';
import axios from 'axios';
// import moment from 'moment';

export default class Events extends React.Component{
    constructor(){
        super()

        this.state = {
            event: null,
            joined: false,
            msg:''
        }
    }
    
    componentDidMount(){
        console.log('starting and then going to get the data')
        const id = this.props.match.params.id
        axios.get(`/event/info/${id}`)
        .then(res => {
            console.log('data receiving',res.data.event)
            this.setState({
                event: res.data.event
            })
        })
    }

    handleToggle = () => {
        this.setState({
            joined: !this.state.joined
        })
    }


    form = () => {
        const { event, joined } = this.state
        const date = new Date(Number(event.start_ts))
        const end = new Date(Number(event.end_ts))
        return(
            <div>
               <h3>Name <span>{event.name}</span></h3>
               <h3>Sport <span>{event.sport_id}</span></h3>
               <h3>Location <span>{event.location}</span></h3>
               <h3>Date <span>{date.toDateString()}</span></h3>
               <h3>Start Time <span>{date.toTimeString()}</span></h3>
               <h3>End Time <span>{end.toTimeString()}</span></h3>
               <h3>Organizer <span>{event.players_usernames[0]}</span></h3>
               <h3>Description <span>{event.description}</span></h3>
               { joined?  <button onClick = {this.leaveEvent} >Leave</button> : <button onClick = {this.joinEvent} >Join</button>  }
        </div>
        )
    }

    joinEvent = () =>{
        const { event } = this.state
        axios.post('/event/join',{
            event_id:event.id
        })
        .then(res => {
         this.setState({
            msg:'Congratulations! You have been added to the event',
            joined:true
       })
   })
        .catch(err => console.log('error fetching the event', err))
    }


    leaveEvent = () => {
        const { event } = this.state
        axios.delete('/event/leave',{
            event_id:event.id
        })
        .then(
            this.setState({
                joined:false
            })
        )
        .catch(err => {
            console.log('error leaving the group', err)})
    }

    render(){
        const { event } = this.state
        return(
            <div>
                {event ? this.form() : ''}
            </div>
        )
    }
}
