import React from 'react';
import axios from 'axios';
import moment from 'moment';

export default class Events extends React.Component{
    constructor(){
        super()

        this.state = {
            currentEvent: null,
            joined: false,
            teams: [],
            click:false,
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

    listTeam = () => {
        //will have to check if number of participants has reached the number of participant
        //get request to check how many players are currently in a team
        //need the max amount of players in the team
        //might not iterate through everything

        const team = {'Team_A': 2, 'Team_B': 3, 'Team_C': 1}
        let game = []
        for(var prop in team){
            if(team[prop] < 3){
                //show it in the pop up
                console.log('getting my team list', this.state.teams)
                 game.push(team[prop])
            }
        }
        this.setState({
            teams: game,
            click: true
        })
    }

    chooseTeam = () => {
        //Send post request to the backend
        //propbably send the team the user choose
        const { event } = this.state
        axios.post('/event/join',{
            event_id:event.id
        })
        .then(res => {
         this.setState({
            msg:'Congratulations! You have been added to the event',
            joined:true
       })
       .catch(err => console.log('error fetching the event', err))
    })
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

    form = () => {
        const { event, joined, teams, click } = this.state
        const date = new Date(Number(event.start_ts))
        const end = new Date(Number(event.end_ts))
        console.log('from the forms',this.state.teams)
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
               { joined?  <button onClick = {this.leaveEvent} >Leave</button> : <button onClick = {this.listTeam} >Join</button>  }
               {click? teams.map(elem => <button onClick = {this.chooseTeam} >{ elem } X { elem }</button>): ''}
        </div>
        )
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
