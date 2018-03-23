import React from 'react';
import axios from 'axios';

import Events from './CreatedEvent'

// const Form = () => {

// }

export default class Event extends React.Component{
    constructor(){
        super()

        this.state = {
            Name: '',
            Address: '',
            DateInfo: null,
            startTime: null,
            endTime: null,
            Description: '',
            sport:null,
            lad:null,
            long: null,
            submit: false,
            sports: ['basketball', 'tennis', 'soccer', 'football', 'handball', 'volleyball']

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        this.setState({
            submit: true
        })
    }

    // handleSubmit = () => {
    //     const {Name, Address, DateInfo, startTime, endTime, Description, sport, lad, long} = this.state

    //     axios.post('',
    //     {name:Name,
    //     lad:lad,
    //     long:long,
    //     address:Address,
    //     date: DateInfo,
    //     start: startTime,
    //     end: endTime,
    //     description:Description,
    //     sport:sport
    //  })
    //  .then(this.setState({
    //     Name: '',
    //     Address: '',
    //     DateInfo: null,
    //     startTime: null,
    //     endTime: null,
    //     Description: '',
    //     sport:sport
    //  }))
    // }

    // componentDidMount(){
    //     //will get the user's sports names
    //     axios.get('/sport/all')
    //     .then(sportNames => 
    //         this.setState({
    //             sports:sportNames
    //         })
    //     )
    // }

    form =() => {
        const { Name, Address, DateInfo, startTime, endTime, Description, sports } = this.state(
        <div>
        <h1>Create An Event</h1>

        <form onSubmit= {this.handleSubmit}>
        
        <input
        type='file'
        name='pic'
        accept='image/*' 
        />

        <input
        type='text'
        name='Name'
        value={Name}
        placeholder='Event name'
        onInput= {this.handleChange} />

        <input
        type='text'
        name='Address'
        value={Address}
        placeholder='Address'
        onInput= {this.handleChange} />

        <input
        type='text'
        name='Date'
        value={DateInfo}
        placeholder='Date'
        onInput= {this.handleChange} />

        <input
        type='time'
        name='startTime'
        value={startTime}
        placeholder='Start'
        onInput= {this.handleChange} />

        <input
        type='time'
        name='endTime'
        value={endTime}
        placeholder='End'
        onInput= {this.handleChange} />

        <select>{['sports', ...sports].map((sport,idx) => 
            <option key={idx} onChange ={this.handleChange} 
            name={sport} value={sport}>{sport}
            </option>)}
        </select>

        <input
        type='textarea'
        name='Description'
        value={Description}
        placeholder='Description'
        onInput= {this.handleChange} />

        <input
        type='submit'
        value='Create event' />
        </form>
    </div>
    )}
    render(){
        const { submit } = this.state
        const { Name, Address, DateInfo, startTime, endTime, Description, sport } = this.state
        const event = {sport: sport, Name:Name, Address: Address, date:DateInfo, start:startTime, end: endTime, description: Description}
        return(
            <div>
                {submit? <Events event={event}/> : this.form() }
            </div>
        )
    }
}